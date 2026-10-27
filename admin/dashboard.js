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
const ALLOWED_EMAILS = ["yabaezzae@gmail.com"];

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

async function loadFailedSearches(){

    const area =
    document.getElementById("failedSearches");

    if(!area) return;


    /* ------------------------------------------------------
       AI 분석 함수
       ------------------------------------------------------ */

    window.analyzeFailedSearch =
    async function(keyword, resultArea){

        resultArea.innerHTML =
        "AI 분석 중...";

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
                        existingContext:""
                    })
                }
            );


            if(!response.ok){

                throw new Error(
                    "AI 분석 요청 실패: " +
                    response.status
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

    copyCodeList.push(dbCode);


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
`{ko:${JSON.stringify(candidateData.ko)},
  en:${JSON.stringify(candidateData.en)},
  zh:${JSON.stringify(candidateData.zh)},
  vi:${JSON.stringify(candidateData.vi)},
  ru:${JSON.stringify(candidateData.ru)}}`;


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
                    AI 분석에 실패했습니다.
                </div>
            `;

        }

    };


    /* ------------------------------------------------------
       AI DB 코드 복사
       ------------------------------------------------------ */

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

        .select("keyword,created_at")

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

        .limit(20);


        if(error) throw error;


        if(data.length===0){

            area.innerHTML=
            "검색 실패 데이터 없음";

            return;

        }


        let html="";


data.forEach((item,index)=>{

    html += `
        <div class="fail-row"
             style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:8px;
                flex-wrap:wrap;
             ">

            <span>
                ${escapeHtml(item.keyword)}
            </span>

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

            <div
                id="ai-result-${index}"
                style="width:100%;"
            ></div>

        </div>
    `;

});


        area.innerHTML= html;
        

        area.querySelectorAll(".ai-analyze-btn").forEach(function(button){

            button.addEventListener("click", function(){

                const index =
                    Number(button.dataset.index);

                const item =
                    data[index];

                const resultArea =
                    document.getElementById(
                        `ai-result-${index}`
                    );

                if(!item){
                    console.error(
                        "AI 분석 대상 데이터를 찾을 수 없습니다.",
                        index
                    );
                    return;
                }

                analyzeFailedSearch(
                    String(item.keyword),
                    resultArea
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

