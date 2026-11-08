/* ==========================================================
   어디에버리지 Admin Dashboard Ver.1
   PART 1
   ========================================================== */

/* ==========================================================
   1. SUPABASE
   ========================================================== */

const SUPABASE_URL =
"https://ootgfnycumxevuilhmwl.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdGdmbnljdW14ZXZ1aWxobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzAyMDIsImV4cCI6MjA5OTgwNjIwMn0.bk5abiU_GzTYYCx1Vww5NOnRc85AxdyaTj9IAZyVE5w";

const db =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ----------------------------------------------------------
   HTML 이스케이프 — 사용자가 입력한 검색어·AI 응답을
   innerHTML 로 출력하기 전에 반드시 거친다 (저장형 XSS 방지)
---------------------------------------------------------- */
function escapeHtml(value){
    return String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#39;");
}

/* ==========================================================
   2. AUTH GUARD — 세션 확인 및 접근 제한
   ========================================================== */

// ✅ 접근을 허용할 구글 이메일 목록 (login.js와 동일하게 유지하세요)
/* ------------------------------------------------------
   품목 DB(data.js) 대조
   시민 화면(app.js go())과 같은 매칭 규칙으로 실패 검색어를 현재 DB와 비교한다.
   - exact  : 검색어와 정확히 일치하는 품목 → "추가 완료"
   - similar: 부분 일치(유사) 품목 → AI 분석 때 참고 자료로 전달
   ------------------------------------------------------ */
function findDbMatches(keyword, lang){
    const empty = { exact: [], similar: [] };
    if (typeof LANGS === "undefined") return empty;
    const l = LANGS[lang] || LANGS.ko;
    if (!l || !Array.isArray(l.db)) return empty;
    const q = l.norm(String(keyword || ""));
    if (!q) return empty;
    const qc = q.replace(/\s+/g, "");
    const isExactTerm = t => l.norm(t).replace(/\s+/g, "") === qc;
    const isMatchTerm = t => {
        const nt = l.norm(t);
        if (!nt) return false;
        return nt.includes(q) || q.includes(nt) ||
            nt.split(" ").some(w => w.length > 1 && q.includes(w)) || isExactTerm(t);
    };
    const exact = l.db.filter(item => item.t.some(isExactTerm));
    const similar = l.db.filter(item => !exact.includes(item) && item.t.some(isMatchTerm));
    return { exact, similar };
}

function buildExistingContext(matches){
    const list = [
        ...matches.exact.map(item => ["정확히 일치", item]),
        ...matches.similar.map(item => ["유사", item]),
    ].slice(0, 8);
    if (!list.length) return "";
    return list.map(([kind, item]) =>
        `[${kind}] ` + JSON.stringify({ t: item.t, c: item.c, d: item.d, s: item.s })
    ).join("\n");
}

const ALLOWED_EMAILS = ["yabaezzae@gmail.com", "judge.demo@example.com"];

// OAuth 콜백 직후에도 세션을 안정적으로 감지하기 위해
// INITIAL_SESSION 이벤트를 기다립니다.
function checkAuth() {
    return new Promise((resolve) => {
        const { data: { subscription } } = db.auth.onAuthStateChange(
            async (event, session) => {
                if (event !== "INITIAL_SESSION") return;

                // 이벤트를 한 번만 처리하고 구독 해제
                subscription.unsubscribe();

                if (!session) {
                    window.location.replace("login.html");
                    resolve(false);
                    return;
                }

                const email = session.user.email;

                if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email)) {
                    await db.auth.signOut();
                    window.location.replace("login.html");
                    resolve(false);
                    return;
                }

                resolve(true);
            }
        );
    });
}

/* ==========================================================
   3. ELEMENT
   ========================================================== */

const totalSearchEl =
document.getElementById("totalSearch");

const todaySearchEl =
document.getElementById("todaySearch");

const successRateEl =
document.getElementById("successRate");

const qrRateEl =
document.getElementById("qrRate");

/* ----------------------------------------------------------
   로그아웃 버튼
---------------------------------------------------------- */
document.querySelector(".logout-btn")?.addEventListener("click", async () => {
    await db.auth.signOut();
    window.location.replace("login.html");
});

/* ==========================================================
   3. FORMAT
   ========================================================== */

function numberFormat(num){

    return Number(num).toLocaleString("ko-KR");

}

function percent(value){

    return `${value.toFixed(1)}%`;

}

/* ==========================================================
   4. DATE
   ========================================================== */

function getTodayStart(){

    const now=new Date();

    now.setHours(0,0,0,0);

    return now.toISOString();

}

/* ==========================================================
   5. TOTAL SEARCH
   ========================================================== */

async function loadTotalSearch(){

    try{

        const {count,error}=await db
        .from("search_logs")
        .select("*",{count:"exact",head:true});

        if(error) throw error;

        totalSearchEl.textContent=
        numberFormat(count);

        return count;

    }

    catch(err){

        console.error(err);

        totalSearchEl.textContent="-";

        return 0;

    }

}

/* ==========================================================
   6. TODAY SEARCH
   ========================================================== */

async function loadTodaySearch(){

    try{

        const {count,error}=await db

        .from("search_logs")

        .select("*",{count:"exact",head:true})

        .gte("created_at",getTodayStart());

        if(error) throw error;

        todaySearchEl.textContent=
        numberFormat(count);

        return count;

    }

    catch(err){

        console.error(err);

        todaySearchEl.textContent="-";

        return 0;

    }

}

/* ==========================================================
   7. SUCCESS RATE
   ========================================================== */

async function loadSuccessRate(){

    try{

        const {count:total}=await db

        .from("search_logs")

        .select("*",{count:"exact",head:true});

        const {count:fail}=await db

        .from("search_logs")

        .select("*",{count:"exact",head:true})

        .eq("result_type","none");

        const success=

        total-fail;

        const rate=

        total===0

        ?0

        :(success/total)*100;

        successRateEl.textContent=

        percent(rate);

    }

    catch(err){

        console.error(err);

        successRateEl.textContent="-";

    }

}

/* ==========================================================
   8. QR RATE
   ========================================================== */

async function loadQRRate(){

    try{

        const {count:total}=await db

        .from("search_logs")

        .select("*",{count:"exact",head:true});

        const {count:qr}=await db

        .from("search_logs")

        .select("*",{count:"exact",head:true})

        .eq("source","qr");

        const rate=

        total===0

        ?0

        :(qr/total)*100;

        qrRateEl.textContent=

        percent(rate);

    }

    catch(err){

        console.error(err);

        qrRateEl.textContent="-";

    }

}

/* ==========================================================
   9. LOAD KPI
   ========================================================== */

async function loadKPI(){

    await loadTotalSearch();

    await loadTodaySearch();

    await loadSuccessRate();

    await loadQRRate();

}


/* ==========================================================
   PART 2
   언어별 통계 / 검색 유형 통계
   ========================================================== */


/* ==========================================================
   11. LANGUAGE LABEL
   ========================================================== */

const languageNames = {

    ko:"한국어",
    en:"영어",
    zh:"중국어",
    vi:"베트남어",
    ru:"러시아어"

};



/* ==========================================================
   12. CATEGORY LABEL
   ========================================================== */

const categoryNames = {

    food:"음식물쓰레기",
    general:"일반쓰레기",
    special:"특수처리",
    none:"검색실패"

};



/* ==========================================================
   13. BAR GRAPH HTML
   ========================================================== */

function createBar(label,value){

    return `

    <div class="stat-row">

        <div class="stat-label">
            ${label}
        </div>


        <div class="stat-bar">

            <div class="stat-fill"
                 style="width:${value}%">
            </div>

        </div>


        <div class="stat-value">
            ${value.toFixed(1)}%
        </div>

    </div>

    `;

}



/* ==========================================================
   14. LANGUAGE STATS
   ========================================================== */

async function loadLanguageStats(){

    const area =
    document.getElementById("languageStats");


    if(!area) return;


    try{


        const {data,error}=await db

        .from("search_logs")

        .select("language");


        if(error) throw error;



        const total=data.length;


        if(total===0){

            area.innerHTML="데이터 없음";

            return;

        }



        const count={};


        data.forEach(item=>{


            const lang =
            item.language || "ko";


            count[lang] =
            (count[lang]||0)+1;


        });



        let html="";



        Object.keys(languageNames)
        .forEach(lang=>{


            const value =

            ((count[lang]||0)/total)*100;



            html += createBar(

                languageNames[lang],

                value

            );


        });



        area.innerHTML=html;



    }

    catch(err){


        console.error(
            "언어 통계 오류:",
            err
        );


        area.innerHTML=
        "데이터 불러오기 실패";


    }

}



/* ==========================================================
   15. CATEGORY STATS
   ========================================================== */

async function loadCategoryStats(){


    const area =
    document.getElementById("categoryStats");


    if(!area) return;



    try{


        const {data,error}=await db

        .from("search_logs")

        .select("result_type");



        if(error) throw error;



        const total=data.length;



        if(total===0){

            area.innerHTML="데이터 없음";

            return;

        }



        const count={};



        data.forEach(item=>{


            const type =
            item.result_type || "none";


            count[type] =
            (count[type]||0)+1;


        });



        let html="";



        Object.keys(categoryNames)

        .forEach(type=>{


            const value =

            ((count[type]||0)/total)*100;



            html += createBar(

                categoryNames[type],

                value

            );


        });



        area.innerHTML=html;



    }

    catch(err){


        console.error(
            "검색 유형 오류:",
            err
        );


        area.innerHTML=
        "데이터 불러오기 실패";


    }


}



/* ==========================================================
   16. UPDATE INIT
   ========================================================== */

async function loadStatistics(){


    await loadLanguageStats();


    await loadCategoryStats();


}

/* ==========================================================
   PART 3
   TOP10 검색어 / 검색 실패 / 최근 검색
   ========================================================== */


/* ==========================================================
   17. TOP10 KEYWORDS
   ========================================================== */

async function loadTopKeywords(){

    const area =
    document.getElementById("topKeywords");


    if(!area) return;


    try{


        const {data,error}=await db

        .from("search_logs")

        .select("keyword");


        if(error) throw error;



        const count={};



        data.forEach(item=>{


            const keyword =
            item.keyword?.trim();


            if(keyword){

                count[keyword]=
                (count[keyword]||0)+1;

            }


        });



        const ranking =

        Object.entries(count)

        .sort((a,b)=>b[1]-a[1])

        .slice(0,10);



        if(ranking.length===0){

            area.innerHTML="데이터 없음";

            return;

        }



        let html="";


        ranking.forEach((item,index)=>{


            html += `

            <div class="rank-row">

                <span class="rank-number">
                    ${index+1}
                </span>


                <span class="rank-keyword">
                    ${escapeHtml(item[0])}
                </span>


                <span class="rank-count">
                    ${item[1]}회
                </span>

            </div>

            `;


        });



        area.innerHTML=html;



    }

    catch(err){


        console.error(
            "TOP10 오류:",
            err
        );


        area.innerHTML=
        "데이터 불러오기 실패";


    }


}



/* ==========================================================
   18. FAILED SEARCH
   ========================================================== */

/* ------------------------------------------------------
   저장된 AI 판단 결과(ai_analysis_results) 불러오기
   같은 검색어(언어 + 정규화 기준)마다 모델별 최신 판단만 남긴다.
   표가 아직 없거나 읽을 수 없으면 표시 없이 넘어간다.
   ------------------------------------------------------ */
function failedKey(keyword, lang){
    const l = (typeof LANGS !== "undefined" && LANGS[lang]) ? LANGS[lang] : null;
    const raw = String(keyword || "");
    return lang + "|" + (l ? l.norm(raw) : raw.trim().toLowerCase()).replace(/\s+/g, "");
}

async function loadAiVerdicts(){
    const verdicts = new Map();
    try{
        const { data, error } = await db
            .from("ai_analysis_results")
            .select("keyword,language,provider,category,need_registration,created_at")
            .order("created_at", { ascending:false })
            .limit(1000);
        if(error) throw error;
        (data || []).forEach(function(row){
            const key = failedKey(row.keyword, row.language || "ko");
            if(!verdicts.has(key)) verdicts.set(key, {});
            const byProvider = verdicts.get(key);
            if(!byProvider[row.provider]) byProvider[row.provider] = row;   // 최신 것만
        });
    }catch(err){
        console.warn("AI 판단 결과를 불러오지 못했습니다(표시 생략):", err && err.message);
    }
    return verdicts;
}

// 두 모델(있는 것만) 모두 일반쓰레기 → 등록 대상 아님 / 판단이 엇갈림 → 검토 필요
function verdictBadge(byProvider){
    const rows = Object.values(byProvider || {});
    if(!rows.length) return "";
    const cats = rows.map(r => r.category);
    const pill = (text, bg, color, title) => `<span class="verdict-badge" title="${title}" style="
                margin-left:6px;
                padding:2px 8px;
                border-radius:999px;
                background:${bg};
                color:${color};
                font-size:12px;
                font-weight:600;
                white-space:nowrap;
           ">${text}</span>`;
    if(cats.every(c => c === "general")){
        return pill("등록 대상 아님", "#eeeef1", "#6b6b76", "AI가 음식물 유래 폐기물이 아니라고 판단했어요");
    }
    if(new Set(cats).size > 1){
        return pill("검토 필요", "#fff1e0", "#b25e00", "두 모델의 판단이 서로 달라요");
    }
    return "";
}

async function loadFailedSearches(){

    const area =
    document.getElementById("failedSearches");

    if(!area) return;


    /* ------------------------------------------------------
       AI 분석 함수
       ------------------------------------------------------ */

    window.analyzeFailedSearch =
    async function(keyword, resultArea, lang, providerOverride){

        // 현재 품목 DB와 대조한 결과(정확히 일치·유사 품목)를 AI에 함께 전달
        const dbMatches = findDbMatches(keyword, lang || "ko");
        const existingContext = buildExistingContext(dbMatches);

        // 선택한 분석 모델 (Gemini / Solar)
        const provider =
            providerOverride ||
            document.querySelector('input[name="aiModel"]:checked')?.value ||
            "gemini";
        const providerLabel =
            provider === "solar" ? "Solar" : "Gemini";

        resultArea.innerHTML =
        "AI 분석 중... (" + providerLabel + ")";

        try{

            // 관리자 로그인 세션의 토큰을 함께 보낸다 (Edge Function 이 관리자만 허용하도록 검증)
            const { data: { session } } = await db.auth.getSession();

            const response =
            await fetch(
                "https://ootgfnycumxevuilhmwl.supabase.co/functions/v1/ai-analyze-failed-search",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                        "apikey": SUPABASE_KEY,
                        "Authorization": "Bearer " + (session?.access_token || SUPABASE_KEY)
                    },
                    body:JSON.stringify({
                        keyword:keyword,
                        existingContext:existingContext,
                        language:lang || "ko",
                        provider:provider
                    })
                }
            );


            if(!response.ok){

                let serverMessage = "";
                try{
                    serverMessage = (await response.json()).error || "";
                }catch(e){}

                throw new Error(
                    "AI 분석 요청 실패: " +
                    response.status +
                    (serverMessage ? " · " + serverMessage : "")
                );

            }


            const result =
            await response.json();


            if(!result.success){

                throw new Error(
                    "AI 분석 결과가 없습니다."
                );

            }


            const analysis =
            result.analysis;

            const candidateData =
            result.data;


            /* ------------------------------------------------
               AI 결과 HTML
               ------------------------------------------------ */

            let html = "";

            html += `
                <div style="
                    margin-top:10px;
                    padding:12px;
                    background:#f7f7f8;
                    border-radius:8px;
                    font-size:13px;
                ">
            `;


            html += `
                <div style="
                    font-weight:700;
                    margin-bottom:8px;
                ">
                    🤖 AI 분석 결과
                    <span style="
                        margin-left:6px;
                        padding:2px 8px;
                        border-radius:999px;
                        background:#ece6ff;
                        color:#5b35d5;
                        font-size:12px;
                        font-weight:600;
                    ">
                        ${escapeHtml((result.provider === "solar" ? "Solar" : "Gemini") + (result.model ? " · " + result.model : ""))}
                    </span>
                </div>
                <div style="
                    margin-bottom:8px;
                    color:#666;
                    font-size:12px;
                ">
                    기존 DB 대조: 정확히 일치 ${dbMatches.exact.length}건 · 유사 ${dbMatches.similar.length}건
                </div>
            `;


            html += `
                <div>
                    분류:
                    <strong>
                        ${escapeHtml(analysis.category || "-")}
                    </strong>
                </div>
            `;


            html += `
                <div>
                    DB 등록 필요:
                    <strong>
                        ${
                            analysis.needRegistration
                            ? "예"
                            : "아니오"
                        }
                    </strong>
                </div>
            `;


            html += `
                <div style="
                    margin-top:6px;
                    color:#555;
                    line-height:1.5;
                ">
                    ${escapeHtml(analysis.reason || "")}
                </div>
            `;


            /* ------------------------------------------------
               DB 등록 필요가 아니면 여기서 종료
               ------------------------------------------------ */

            if(!analysis.needRegistration){

                html += `
                    <div style="
                        margin-top:10px;
                        padding:8px 10px;
                        background:#fff;
                        border-radius:6px;
                        color:#666;
                        font-size:12px;
                    ">
                        ℹ️ 현재 AI 판단으로는 신규 DB 등록 후보가 아닙니다.
                    </div>
                `;

                html += `</div>`;

                resultArea.innerHTML =
                html;

                return;
            }


            /* ------------------------------------------------
               등록 후보 데이터
               ------------------------------------------------ */

            if(
                !candidateData ||
                !candidateData.ko ||
                !candidateData.en ||
                !candidateData.zh ||
                !candidateData.vi ||
                !candidateData.ru
            ){

                html += `
                    <div style="
                        margin-top:10px;
                        padding:8px 10px;
                        background:#fff3cd;
                        border-radius:6px;
                        color:#856404;
                        font-size:12px;
                    ">
                        ⚠️ 등록 후보 데이터가 생성되지 않았습니다.
                        관리자 검토가 필요합니다.
                    </div>
                `;

                html += `</div>`;

                resultArea.innerHTML =
                html;

                return;
            }


            /* ------------------------------------------------
               언어별 DB 코드 생성 함수
               ------------------------------------------------ */

            // data.js 에 그대로 붙여 넣는 한 줄 형식 (끝에 쉼표 포함)
            function makeDbLine(item){
                return `{t:${JSON.stringify(item.t || [])},c:${JSON.stringify(item.c || "food")},d:${JSON.stringify(item.d || "")},s:${JSON.stringify(item.s || [])}},`;
            }

            function makeDbCode(item){

                return `{t: ${JSON.stringify(item.t || [], null, 2)}, c: ${JSON.stringify(item.c || "food")},  d: ${JSON.stringify(item.d || "")},  s: ${JSON.stringify(item.s || [], null, 2)}}`;
            }


        const languages = [
    ["ko","한국어"],
    ["en","English"],
    ["zh","中文"],
    ["vi","Tiếng Việt"],
    ["ru","Русский"]
];


/* ------------------------------------------------
   복사할 코드 임시 저장
   ------------------------------------------------ */

const copyCodeList = [];


/* ------------------------------------------------
   DB 등록 후보 데이터 영역
   ------------------------------------------------ */

html += `
    <div style="
        margin-top:12px;
        padding-top:12px;
        border-top:1px solid #ddd;
    ">
        <div style="
            font-weight:700;
            margin-bottom:6px;
        ">
            📋 DB 등록 후보 데이터
        </div>

        <div style="
            color:#777;
            font-size:12px;
            margin-bottom:10px;
            line-height:1.5;
        ">
            아래 내용은 AI가 생성한 후보 데이터입니다.
            실제 배출기준을 확인한 후
            <strong>data.js</strong>에 반영하세요.
        </div>
`;


languages.forEach(function(lang){

    const code =
        lang[0];

    const name =
        lang[1];

    const item =
        candidateData[code];

    const dbCode =
        makeDbCode(item);


    const copyIndex =
        copyCodeList.length;

    // 화면에는 보기 좋게(dbCode), 복사는 data.js 한 줄 형식으로
    copyCodeList.push(makeDbLine(item));


    html += `
        <div style="
            margin-top:10px;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:4px;
            ">

                <strong>
                    ${escapeHtml(name)}
                </strong>

                <button
                    type="button"
                    class="ai-copy-code-btn"
                    data-copy-index="${copyIndex}"
                    style="
                        border:0;
                        border-radius:5px;
                        padding:4px 8px;
                        background:#eee;
                        color:#333;
                        font-size:11px;
                        cursor:pointer;
                    "
                >
                    복사
                </button>

            </div>


            <pre style="
                margin:0;
                padding:9px;
                background:#fff;
                border:1px solid #e5e5e5;
                border-radius:6px;
                overflow-x:auto;
                white-space:pre-wrap;
                font-size:11px;
                line-height:1.5;
            ">${escapeHtml(dbCode)}</pre>

        </div>
    `;

});


/* ------------------------------------------------
   전체 언어 데이터
   ------------------------------------------------ */

const allDataCode =
    languages.map(function(lang){
        return "// " + lang[0] + " (" + lang[1] + ")\n" + makeDbLine(candidateData[lang[0]]);
    }).join("\n");

const allDataCopyIndex =
    copyCodeList.length;

copyCodeList.push(allDataCode);


html += `
    <button
        type="button"
        class="ai-copy-all-btn"
        data-copy-index="${allDataCopyIndex}"
        style="
            margin-top:12px;
            width:100%;
            border:0;
            border-radius:6px;
            padding:8px 10px;
            background:#7B4DFF;
            color:#fff;
            font-size:12px;
            font-weight:600;
            cursor:pointer;
        "
    >
        📋 전체 언어 데이터 복사
    </button>
`;


html += `
    </div>
`;


html += `
    <div style="
        margin-top:10px;
        padding:8px 10px;
        background:#fff8e1;
        border-radius:6px;
        color:#765800;
        font-size:11px;
        line-height:1.5;
    ">
        ⚠️ AI 생성 데이터는 최종 행정자료가 아닙니다.
        담당자가 배출기준과 기존 DB를 확인한 후 등록하세요.
    </div>
`;


html += `
    </div>
`;


resultArea.innerHTML =
    html;


/* ------------------------------------------------
   복사 버튼 이벤트 연결
   ------------------------------------------------ */

resultArea
    .querySelectorAll(".ai-copy-code-btn")
    .forEach(function(button){

        button.addEventListener(
            "click",
            function(){

                const index =
                    Number(
                        button.dataset.copyIndex
                    );

                const code =
                    copyCodeList[index];

                copyAiDbCode(
                    button,
                    code
                );

            }
        );

    });


/* ------------------------------------------------
   전체 언어 복사 버튼 이벤트
   ------------------------------------------------ */

const allCopyButton =
    resultArea.querySelector(
        ".ai-copy-all-btn"
    );


if(allCopyButton){

    allCopyButton.addEventListener(
        "click",
        function(){

            const index =
                Number(
                    allCopyButton.dataset.copyIndex
                );

            const code =
                copyCodeList[index];

            copyAiDbCode(
                allCopyButton,
                code
            );

        }
    );

    }
}


        catch(err){

            console.error(
                "AI 분석 오류:",
                err
            );


            resultArea.innerHTML =
            `
                <div style="
                    margin-top:10px;
                    color:#d33;
                    font-size:13px;
                ">
                    AI 분석에 실패했습니다 (${escapeHtml(providerLabel)}).
                    <div style="margin-top:4px;color:#999;font-size:12px;">
                        ${escapeHtml(err && err.message ? err.message : "")}
                    </div>
                </div>
            `;

        }

    };


    /* ------------------------------------------------------
       AI DB 코드 복사
       ------------------------------------------------------ */

    /* ------------------------------------------------------
       AI 분석 비교 팝업
       같은 검색어를 Gemini 와 Solar 에 동시에 보내고
       결과를 좌우(좁은 화면은 위아래) 두 칸에 나란히 보여준다.
       ------------------------------------------------------ */

    function aiModalEsc(e){
        if(e.key === "Escape") closeAiCompareModal();
    }

    window.closeAiCompareModal =
    function(){
        const overlay = document.getElementById("aiCompareModal");
        if(overlay) overlay.remove();
        document.body.classList.remove("ai-modal-open");
        document.removeEventListener("keydown", aiModalEsc);
    };

    window.openAiCompareModal =
    function(keyword, lang){

        closeAiCompareModal();

        const matches = findDbMatches(keyword, lang || "ko");

        const overlay = document.createElement("div");
        overlay.id = "aiCompareModal";
        overlay.className = "ai-modal-overlay";
        overlay.innerHTML = `
            <div class="ai-modal" role="dialog" aria-modal="true" aria-labelledby="aiModalTitle">
                <div class="ai-modal-head">
                    <div>
                        <div class="ai-modal-title" id="aiModalTitle">
                            🤖 AI 분석 비교 · ‘${escapeHtml(keyword)}’
                        </div>
                        <div class="ai-modal-sub">
                            두 모델에 같은 질문을 보냈습니다 ·
                            기존 DB 대조: 정확히 일치 ${matches.exact.length}건 · 유사 ${matches.similar.length}건
                        </div>
                    </div>
                    <button type="button" class="ai-modal-close" aria-label="닫기">✕</button>
                </div>
                <div class="ai-modal-body">
                    <section class="ai-modal-col">
                        <div class="ai-col-head gemini">Gemini</div>
                        <div class="ai-col-result" id="aiCompareGemini"></div>
                    </section>
                    <section class="ai-modal-col">
                        <div class="ai-col-head solar">Solar (Upstage)</div>
                        <div class="ai-col-result" id="aiCompareSolar"></div>
                    </section>
                </div>
                <div class="ai-modal-foot">
                    ⚠️ AI 결과는 초안입니다. 두 결과를 비교해 담당자가 확인한 내용만 data.js에 반영하세요.
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.classList.add("ai-modal-open");

        overlay.addEventListener("click", function(e){
            if(e.target === overlay) closeAiCompareModal();
        });
        overlay.querySelector(".ai-modal-close")
            .addEventListener("click", closeAiCompareModal);
        document.addEventListener("keydown", aiModalEsc);

        Promise.allSettled([
            analyzeFailedSearch(keyword, overlay.querySelector("#aiCompareGemini"), lang, "gemini"),
            analyzeFailedSearch(keyword, overlay.querySelector("#aiCompareSolar"), lang, "solar"),
        ]).then(function(){
            // 저장된 판단을 반영해 목록 표시(등록 대상 아님 / 검토 필요) 새로고침
            if(typeof loadFailedSearches === "function") loadFailedSearches();
        });
    };


    window.copyAiDbCode =
    async function(button, code){

        try{

            await navigator.clipboard.writeText(
                code
            );

            const originalText =
            button.textContent;

            button.textContent =
            "복사 완료 ✓";

            setTimeout(function(){

                button.textContent =
                originalText;

            },1500);

        }
        catch(err){

            console.error(
                "복사 실패:",
                err
            );

            alert(
                "복사에 실패했습니다."
            );

        }

    };


    /* ------------------------------------------------------
       실패 검색어 조회
       ------------------------------------------------------ */

    try{

        const {data,error}=await db

        .from("search_logs")

        .select("keyword,created_at,language")

        .eq(
            "result_type",
            "none"
        )

        .order(
            "created_at",
            {
                ascending:false
            }
        )

        .limit(300);


        if(error) throw error;


        // 같은 검색어(언어 + 시민 화면과 같은 정규화 기준)는 한 줄로 합치고 횟수를 센다.
        // 최신 기록이 먼저 오므로 처음 나온 표기와 시각을 대표로 쓴다.
        const groups = [];
        const groupByKey = new Map();

        (data || []).forEach(function(row){
            const lang = row.language || "ko";
            const l = (typeof LANGS !== "undefined" && LANGS[lang]) ? LANGS[lang] : null;
            const raw = String(row.keyword || "");
            const norm = (l ? l.norm(raw) : raw.trim().toLowerCase()).replace(/\s+/g, "");
            if(!norm) return;
            const key = lang + "|" + norm;
            if(groupByKey.has(key)){
                groupByKey.get(key).count++;
            }else{
                const g = { keyword: row.keyword, language: lang, created_at: row.created_at, count: 1 };
                groupByKey.set(key, g);
                groups.push(g);
            }
        });

        const rows = groups.slice(0, 20);

        const aiVerdicts = await loadAiVerdicts();


        if(rows.length===0){

            area.innerHTML=
            "검색 실패 데이터 없음";

            return;

        }


        let html="";


rows.forEach((item,index)=>{

    // 지금 DB에 정확히 일치하는 품목이 있으면 이미 반영된 검색어
    const isAdded =
        findDbMatches(item.keyword, item.language || "ko").exact.length > 0;

    const addedBadge = isAdded
        ? `<span class="added-badge" title="현재 품목 DB에 등록되어 있어요" style="
                margin-left:6px;
                padding:2px 8px;
                border-radius:999px;
                background:#e6f7ed;
                color:#1f8f4e;
                font-size:12px;
                font-weight:600;
                white-space:nowrap;
           ">✅ 추가 완료</span>`
        : "";

    // 이미 DB에 있으면 "추가 완료"가 우선, 아니면 저장된 AI 판단 표시
    const aiBadge = isAdded
        ? ""
        : verdictBadge(aiVerdicts.get(failedKey(item.keyword, item.language || "ko")));

    const countBadge = item.count > 1
        ? `<span class="fail-count" title="같은 검색어 실패 횟수" style="
                margin-left:6px;
                padding:2px 7px;
                border-radius:999px;
                background:#f1f1f4;
                color:#666;
                font-size:12px;
                white-space:nowrap;
           ">${item.count}회</span>`
        : "";

    html += `
        <div class="fail-row"
             style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:8px;
                flex-wrap:wrap;
             ">

            <div style="display:flex;align-items:center;flex-wrap:wrap;">
                <span>
                    ${escapeHtml(item.keyword)}
                </span>
                ${countBadge}
                ${addedBadge}
                ${aiBadge}
            </div>

            <button
                type="button"
                class="ai-analyze-btn"
                data-index="${index}"
                style="
                    border:0;
                    border-radius:6px;
                    padding:5px 9px;
                    background:#7B4DFF;
                    color:#fff;
                    font-size:12px;
                    cursor:pointer;
                "
            >
                AI 분석
            </button>

        </div>
    `;

});


        area.innerHTML= html;
        

        area.querySelectorAll(".ai-analyze-btn").forEach(function(button){

            button.addEventListener("click", function(){

                const index =
                    Number(button.dataset.index);

                const item =
                    rows[index];

                if(!item){
                    console.error(
                        "AI 분석 대상 데이터를 찾을 수 없습니다.",
                        index
                    );
                    return;
                }

                openAiCompareModal(
                    String(item.keyword),
                    item.language || "ko"
                );

            });

        });

    }



    catch(err){

        console.error(
            "검색 실패 오류:",
            err
        );

        area.innerHTML=
        "데이터 불러오기 실패";

    }

}

/* ==========================================================
   19. RECENT SEARCH
   ========================================================== */

async function loadRecentSearches(){
    const area = document.getElementById("recentSearches");
    if(!area) return;


    try{
        const {data,error}=await db
        .from("search_logs")
        .select("keyword,result_type,language,source,created_at")
        .order("created_at", {ascending:false})
        .limit(20);

        if(error) throw error;

        if(data.length===0){
            area.innerHTML= "최근 검색 데이터 없음";
            return;
        }

        let html="";

        data.forEach(item=>{
            const time = new Date(item.created_at).toLocaleTimeString("ko-KR", {
                    hour:"2-digit",
                    minute:"2-digit"
                }
              );

            html += `
            <div class="recent-row">
                <span class="recent-time"> ${time} </span>
                <span class="recent-keyword"> ${escapeHtml(item.keyword)} </span>
                <span class="recent-type"> ${escapeHtml(item.result_type)} </span>
                <span class="recent-lang"> ${escapeHtml(item.language)} </span>
                <span class="recent-source"> ${escapeHtml(item.source || "web")} </span>
            </div>
            `;
        });

        area.innerHTML = html;

    }

    catch(err){


        console.error(
            "최근 검색 오류:",
            err
        );


        area.innerHTML=
        "데이터 불러오기 실패";


    }


}



/* ==========================================================
   20. PART3 LOAD
   ========================================================== */

async function loadOperationData(){


    await loadTopKeywords();


    await loadFailedSearches();


    await loadRecentSearches();


}

/* ==========================================================
   PART 4-1
   최근 7일 검색량 (Chart.js)
   ========================================================== */

let weeklyChart = null;

/* ==========================================================
   날짜를 YYYY-MM-DD(KST)로 변환
   ========================================================== */

function formatKSTDate(date){

    const kst = new Date(
        date.getTime() + (9 * 60 * 60 * 1000)
    );

    return kst.toISOString().slice(0,10);

}


/* ==========================================================
   최근 7일 배열 생성
   ========================================================== */

function createLast7Days(){

    const labels = [];
    const keys = [];

    const today = new Date();

    for(let i=6;i>=0;i--){

        const d = new Date(today);

        d.setDate(today.getDate()-i);

        keys.push(formatKSTDate(d));

        labels.push(

            `${d.getMonth()+1}/${d.getDate()}`

        );

    }

    return {

        labels,

        keys

    };

}


/* ==========================================================
   최근 7일 검색량
   ========================================================== */

async function loadWeeklyChart(){

    const canvas =
    document.getElementById("weeklyChart");

    if(!canvas) return;

    try{

        const {labels,keys}
        = createLast7Days();

        const countMap={};

        keys.forEach(day=>{

            countMap[day]=0;

        });

        const firstDay =

            new Date();

        firstDay.setDate(
            firstDay.getDate()-6
        );

        firstDay.setHours(
            0,0,0,0
        );

        const {data,error}=await db

        .from("search_logs")

        .select("created_at")

        .gte(
            "created_at",
            firstDay.toISOString()
        );

        if(error) throw error;

        data.forEach(item=>{

            const day =

                formatKSTDate(

                    new Date(item.created_at)

                );

            if(countMap.hasOwnProperty(day)){

                countMap[day]++;

            }

        });

        const values =

            keys.map(day=>countMap[day]);

        if(weeklyChart){

            weeklyChart.destroy();

        }

        weeklyChart =

        new Chart(canvas,{

            type:"bar",

            data:{

                labels:labels,

                datasets:[{

                    label:"검색량",

                    data:values,

                    backgroundColor:"#7b4dff",

                    hoverBackgroundColor:"#946dff",

                    borderRadius:10,

                    borderSkipped:false,

                    maxBarThickness:42

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    duration:900

                },

                plugins:{

                    legend:{

                        display:false

                    },

                    tooltip:{

                        callbacks:{

                            label:function(context){

                                return context.raw + "건";

                            }

                        }

                    }

                },

                scales:{

                    x:{

                        grid:{

                            display:false

                        }

                    },

                    y:{

                        beginAtZero:true,

                        ticks:{

                            precision:0,

                            stepSize:1

                        }

                    }

                }

            }

        });

        console.log(

            "최근 7일 차트 로딩 완료"

        );

    }

    catch(err){

        console.error(

            "최근 7일 차트 오류",

            err

        );

    }

}

/* ==========================================================
   PART 4-2A
   CSV DOWNLOAD (Ver.1 Final)
   ========================================================== */

async function downloadCSV(){

    try{

        console.log("CSV 다운로드 시작");

        const {data,error}=await db

            .from("search_logs")

            .select("*")

            .order(
                "created_at",
                {
                    ascending:false
                }
            );

        if(error) throw error;

        if(!data || data.length===0){

            alert("다운로드할 데이터가 없습니다.");

            return;

        }

        const headers=[
            "id",
            "created_at",
            "keyword",
            "result_type",
            "language",
            "source"
        ];

        let csv=headers.join(",")+"\n";

        data.forEach(row=>{

            const values=headers.map(col=>{

                let value=row[col];

                if(value===null || value===undefined){

                    value="";

                }

                value=String(value)

                    .replace(/"/g,'""')

                    .replace(/\r/g," ")

                    .replace(/\n/g," ");

                return `"${value}"`;

            });

            csv+=values.join(",")+"\n";

        });

        /* Excel UTF-8 BOM */

        const BOM="\uFEFF";

        const blob=new Blob(

            [BOM+csv],

            {

                type:"text/csv;charset=utf-8;"

            }

        );

        const url=

            URL.createObjectURL(blob);

        const link=

            document.createElement("a");

        const today=

            new Date()

            .toISOString()

            .slice(0,10);

        link.href=url;

        link.download=

            `search_logs_${today}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        console.log("CSV 다운로드 완료");

    }

    catch(err){

        console.error(

            "CSV 다운로드 오류",

            err

        );

        alert(

            "CSV 다운로드에 실패했습니다."

        );

    }

}

/* ==========================================================
   PART 4-2B
   Dashboard Event / Init (Ver.1 Final)
   ========================================================== */


/* ==========================================================
   CSV 버튼 이벤트
   ========================================================== */

function bindDashboardEvents(){

    const csvButton =
        document.querySelector(".csv-btn");

    if(csvButton){

        csvButton.addEventListener(

            "click",

            downloadCSV

        );

    }

}


/* ==========================================================
   Dashboard 초기화
   ========================================================== */

async function initDashboard(){

    try{

        console.log("=================================");
        console.log("Dashboard Start");
        console.log("=================================");

        console.log("① KPI 로딩...");
        await loadKPI();

        console.log("② 통계 로딩...");
        await loadStatistics();

        console.log("③ 운영 데이터 로딩...");
        await loadOperationData();

        console.log("④ 최근 7일 차트...");
        await loadWeeklyChart();

        console.log("⑤ 이벤트 연결...");
        bindDashboardEvents();

        console.log("=================================");
        console.log("Dashboard Ready");
        console.log("=================================");

    }

    catch(err){

        console.error(

            "Dashboard 초기화 실패",

            err

        );

    }

}


/* ==========================================================
   페이지 로드
   ========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async function(){

        const ok = await checkAuth();
        if (!ok) return;

        initDashboard();

    }

);

