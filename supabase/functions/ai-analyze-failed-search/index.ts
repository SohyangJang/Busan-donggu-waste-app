const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const outputSchema = {
  type: "object",
  properties: {
    analysis: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["food", "general"],
          description: "품목의 예상 폐기물 분류",
        },
        needRegistration: {
          type: "boolean",
          description: "현재 DB에 등록할 필요가 있는지",
        },
        reason: {
          type: "string",
          description: "등록 필요 여부를 판단한 이유",
        },
      },
      required: ["category", "needRegistration", "reason"],
    },

    data: {
      type: "object",
      properties: {
        ko: {
          type: "object",
          properties: {
            t: {
              type: "array",
              items: { type: "string" },
              description: "한국어 검색어 목록",
            },
            c: {
              type: "string",
              enum: ["food", "general", "special"],
            },
            d: {
              type: "string",
              description: "한국어 품목 설명",
            },
            s: {
              type: "array",
              items: { type: "string" },
              description: "한국어 배출 방법",
            },
          },
          required: ["t", "c", "d", "s"],
        },

        en: {
          type: "object",
          properties: {
            t: { type: "array", items: { type: "string" } },
            c: {
              type: "string",
              enum: ["food", "general", "special"],
            },
            d: { type: "string" },
            s: { type: "array", items: { type: "string" } },
          },
          required: ["t", "c", "d", "s"],
        },

        zh: {
          type: "object",
          properties: {
            t: { type: "array", items: { type: "string" } },
            c: {
              type: "string",
              enum: ["food", "general", "special"],
            },
            d: { type: "string" },
            s: { type: "array", items: { type: "string" } },
          },
          required: ["t", "c", "d", "s"],
        },

        vi: {
          type: "object",
          properties: {
            t: { type: "array", items: { type: "string" } },
            c: {
              type: "string",
              enum: ["food", "general", "special"],
            },
            d: { type: "string" },
            s: { type: "array", items: { type: "string" } },
          },
          required: ["t", "c", "d", "s"],
        },

        ru: {
          type: "object",
          properties: {
            t: { type: "array", items: { type: "string" } },
            c: {
              type: "string",
              enum: ["food", "general", "special"],
            },
            d: { type: "string" },
            s: { type: "array", items: { type: "string" } },
          },
          required: ["t", "c", "d", "s"],
        },
      },
      required: ["ko", "en", "zh", "vi", "ru"],
    },
  },
  required: ["analysis", "data"],
};

// ─────────────────────────────────────────────────────────────
// 관리자 인증
// 대시보드가 보낸 Supabase 로그인 토큰을 검증하고,
// ADMIN_EMAILS(쉼표 구분) 시크릿에 등록된 이메일만 허용합니다.
// 설정 예: supabase secrets set ADMIN_EMAILS=admin@example.com
// ─────────────────────────────────────────────────────────────
async function authenticateAdmin(
  req: Request,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const allowed = (Deno.env.get("ADMIN_EMAILS") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length === 0) {
    return {
      ok: false,
      status: 500,
      message: "ADMIN_EMAILS가 Supabase Secret에 설정되지 않았습니다.",
    };
  }

  const authorization = req.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) {
    return { ok: false, status: 401, message: "로그인이 필요합니다." };
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) {
    return { ok: false, status: 500, message: "Supabase 환경변수가 없습니다." };
  }

  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: anonKey },
  });
  if (!userRes.ok) {
    return { ok: false, status: 401, message: "유효하지 않은 로그인 정보입니다." };
  }

  const user = await userRes.json();
  const email = String(user?.email ?? "").toLowerCase();
  if (!allowed.includes(email)) {
    return { ok: false, status: 403, message: "접근 권한이 없습니다." };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "POST 요청만 허용됩니다." }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  // 인증: 허용된 관리자만 호출할 수 있습니다 (Gemini 사용량 보호)
  const auth = await authenticateAdmin(req);
  if (!auth.ok) {
    return new Response(
      JSON.stringify({ success: false, error: auth.message }),
      {
        status: auth.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // 모델명은 Supabase Secret(GEMINI_MODEL)로 교체 가능. 없거나 형식이 이상하면 기본값 사용.
    const modelEnv = (Deno.env.get("GEMINI_MODEL") ?? "").trim();
    const GEMINI_MODEL = /^[A-Za-z0-9._-]{1,80}$/.test(modelEnv)
      ? modelEnv
      : "gemini-3.5-flash-lite";
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY가 Supabase Secret에 없습니다.");
    }

    const body = await req.json();

    const keyword = String(body.keyword ?? "").trim();
    const existingContext = String(body.existingContext ?? "").trim();

    if (!keyword) {
      return new Response(
        JSON.stringify({ error: "분석할 검색어가 없습니다." }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const prompt = `
당신은 부산광역시 생활폐기물 배출안내 서비스의
데이터 관리 보조 AI입니다.

사용자가 검색했지만 현재 데이터베이스에서 검색되지 않은 품목을 분석하고,
관리자가 검토한 뒤 데이터베이스에 추가할 수 있는 후보 데이터를 생성하세요.

중요한 원칙:

1. AI가 최종 행정 판단을 내리는 것이 아닙니다.
   담당자가 검토할 수 있는 "후보 데이터"를 만드는 것이 목적입니다.

2. 이 서비스에서 신규 DB 등록 후보가 될 수 있는 것은 오직 "음식물 유래 폐기물"입니다.

2-1. 검색어 하나에 대해 DB 등록 후보가 하나뿐이라고 가정하지 마십시오.
   검색어의 부위, 형태, 구성요소에 따라 배출방법이 달라지는 경우
    서로 다른 DB 항목으로 각각 생성하십시오.
   예:"호두"처럼 껍질과 알맹이의 배출방법이 다른 경우
    1) 호두껍질 → general
    2) 호두 알맹이 → food
   처럼 별도의 후보 데이터로 생성하십시오.

   단, 단순히 표현만 다른 중복 항목은 여러 개 생성하지 마십시오.
   실제 검색어의 의미가 서로 다른 경우에만 여러 후보를 생성하십시오.

3. 폐기물 분류는 다음 두 가지 중 하나만 사용하세요.
   - food: 음식물에서 유래한 폐기물
   - general: 음식물 유래 폐기물이 아닌 품목 또는 이 서비스의 음식물 DB 등록 대상이 아닌 품목

4. 매우 중요한 등록 규칙:
   - 음식물 유래 폐기물이 아니면 반드시 category="general"로 판단하세요.
   - 음식물 유래 폐기물이 아니면 반드시 needRegistration=false로 판단하세요.
   - 일반 생활용품, 전자제품, 가구, 생활잡화, 재활용품, 금속류, 플라스틱류,
     종이류, 의류, 생활기기 등은 절대로 신규 DB 등록 후보로 만들지 마세요.
   - 예를 들어 "선풍기", "의자", "휴대폰", "냄비"와 같은 품목은
     현재 음식물 DB의 등록 대상이 아니므로 needRegistration=false입니다.

5. 음식물 유래 폐기물이라고 판단한 경우에만 기존 DB와 비교하여
   신규 등록 필요성을 판단하세요.
   - 기존 DB에 이미 있거나 의미가 겹치면 needRegistration=false
   - 기존 DB에 없고 신규 등록 가치가 있다고 판단되는 경우에만 needRegistration=true

6. needRegistration=true가 되는 조건은 반드시 다음 두 가지를 모두 만족해야 합니다.
   (1) category="food"
   (2) 기존 DB에 해당 품목이 없거나 의미가 겹치지 않음

7. category="general"인 경우에는 어떠한 경우에도 needRegistration=true로 설정하지 마세요.

8. 검색어의 오탈자, 띄어쓰기, 일반적인 표현 차이를 고려하세요.

9. t에는 실제 사용자가 검색할 가능성이 있는 표현을 넣으세요.
   불필요하게 너무 많은 동의어를 만들지 마세요.

10. d와 s는 실제 행정 안내문에 사용할 수 있을 정도로 간결하게 작성하되 기존의 data form과 통일해주세요.
    {t:["호두껍질","밤껍질","땅콩껍질","도토리껍질","견과류껍질","마카다미아껍질"],c:"general",d:"견과류 껍질 (호두·밤·땅콩·도토리·마카다미아)",s:["종량제봉투에 넣어 배출"]},
    {t:["호두","밤","땅콩","도토리","마카다미아","땅콩알맹이","마카다미아알맹이","견과류알맹이"],c:"food",d:"견과류 알맹이(호두·밤·땅콩·도토리·마카다미아)",s:["음식물쓰레기 전용용기에 배출"]},

11. 외국어 데이터는 한국어 판단 결과를 기준으로 자연스럽게 번역하세요.

12. 법령이나 지자체별 배출기준이 확실하지 않은 경우
   사실을 만들어내지 말고 관리자 검토가 필요하도록 reason에 명시하세요.

13. 기존 DB 내용과 충돌할 가능성이 있으면
   needRegistration을 false로 하거나 reason에 충돌 가능성을 명시하세요.

14. 결과는 반드시 지정된 JSON 구조만 반환하세요.

분석 대상 검색어:
${keyword}

현재 DB에서 관련성이 있는 기존 데이터:
${existingContext || "(제공된 기존 데이터 없음)"}
`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": GEMINI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],

          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: outputSchema,
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();

      console.error("Gemini API error:", errorText);

      return new Response(
        JSON.stringify({
          error: "Gemini API 호출에 실패했습니다.",
          detail: errorText,
        }),
        {
          status: 502,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const geminiData = await geminiResponse.json();

    const text =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Gemini 응답에서 JSON 데이터를 찾을 수 없습니다.");
    }

    const result = JSON.parse(text);

    // 안전장치:
    // 음식물 유래 폐기물(food)이 아닌 경우에는
    // 어떤 경우에도 신규 DB 등록 대상으로 처리하지 않음
    if (result.analysis?.category !== "food") {
  result.analysis.needRegistration = false;
    }

    return new Response(
      JSON.stringify({
        success: true,
        keyword,
        ...result,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("AI analysis error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});