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

/* ==========================================================
   2. ELEMENT
   ========================================================== */

const totalSearchEl =
document.getElementById("totalSearch");

const todaySearchEl =
document.getElementById("todaySearch");

const successRateEl =
document.getElementById("successRate");

const qrRateEl =
document.getElementById("qrRate");

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
   10. DASHBOARD INIT
   ========================================================== */

async function initDashboard(){

    console.log("Dashboard Start");

    await loadKPI();
    await loadStatistics();
    await loadOperationData();

}

document.addEventListener(

    "DOMContentLoaded",

    initDashboard

);
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
                    ${item[0]}
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



    try{


        const {data,error}=await db

        .from("search_logs")

        .select("keyword,created_at")

        .eq("result_type","none")

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



        data.forEach(item=>{


            html += `

            <div class="fail-row">

                <span>
                    ${item.keyword}
                </span>

            </div>

            `;


        });



        area.innerHTML=html;



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


    const area =
    document.getElementById("recentSearches");


    if(!area) return;



    try{


        const {data,error}=await db

        .from("search_logs")

        .select(
            "keyword,result_type,language,source,created_at"
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
            "최근 검색 데이터 없음";

            return;

        }



        let html="";



        data.forEach(item=>{


            const time =

            new Date(item.created_at)

            .toLocaleTimeString(
                "ko-KR",
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            );



            html += `

            <div class="recent-row">


                <span class="recent-time">
                    ${time}
                </span>


                <span class="recent-keyword">
                    ${item.keyword}
                </span>


                <span class="recent-type">
                    ${item.result_type}
                </span>


                <span class="recent-lang">
                    ${item.language}
                </span>


                <span class="recent-source">
                    ${item.source || "web"}
                </span>


            </div>

            `;


        });



        area.innerHTML=html;



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

