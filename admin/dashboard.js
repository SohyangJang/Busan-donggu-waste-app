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

}

document.addEventListener(

    "DOMContentLoaded",

    initDashboard

);

