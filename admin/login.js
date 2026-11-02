/* ==========================================================
   어디에버리지 Admin Login — Google OAuth
   ========================================================== */

const SUPABASE_URL = "https://ootgfnycumxevuilhmwl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdGdmbnljdW14ZXZ1aWxobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzAyMDIsImV4cCI6MjA5OTgwNjIwMn0.bk5abiU_GzTYYCx1Vww5NOnRc85AxdyaTj9IAZyVE5w";

// ✅ 접근을 허용할 구글 이메일 목록 (여기에 본인 이메일을 추가하세요)
const ALLOWED_EMAILS = ["yabaezzae@gmail.com", "judge.demo@example.com"];

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const googleBtn  = document.getElementById("googleBtn");
const messageEl  = document.getElementById("message");

/* ----------------------------------------------------------
   이미 로그인된 세션이 있으면 이메일 확인 후 대시보드로 이동
---------------------------------------------------------- */
(async () => {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
        await checkAndRedirect(session.user.email);
    }
})();

/* ----------------------------------------------------------
   Google OAuth 팝업 로그인
---------------------------------------------------------- */
googleBtn.addEventListener("click", async () => {
    googleBtn.classList.add("loading");
    googleBtn.textContent = "로그인 중...";
    messageEl.textContent = "";
    messageEl.className = "";

    // 현재 login.html 경로를 기준으로 dashboard.html URL을 계산합니다.
    // (예: http://localhost:8080/admin/login.html → http://localhost:8080/admin/dashboard.html)
    const redirectTo = window.location.href.replace(/\/[^/]*$/, '/dashboard.html');

    const { error } = await db.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo
        }
    });

    if (error) {
        showError("로그인에 실패했습니다. 다시 시도해 주세요.");
        resetBtn();
    }
});

/* ----------------------------------------------------------
   심사위원 이메일·비밀번호 로그인 (구글 로그인과 별개로 동작)
   - 계정은 Supabase Auth에서 직접 만든 읽기 전용 임시 계정입니다.
   - 접근 가능 여부는 ALLOWED_EMAILS와 DB 정책(RLS)이 함께 결정합니다.
---------------------------------------------------------- */
const judgeForm  = document.getElementById("judgeForm");
const judgeBtn   = document.getElementById("judgeBtn");

if (judgeForm) {
    judgeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email    = document.getElementById("judgeEmail").value.trim().toLowerCase();
        const password = document.getElementById("judgePw").value;

        judgeBtn.disabled = true;
        judgeBtn.textContent = "로그인 중...";
        messageEl.textContent = "";

        const { data, error } = await db.auth.signInWithPassword({ email, password });

        if (error || !data?.user) {
            showError("이메일 또는 비밀번호가 올바르지 않습니다.");
            judgeBtn.disabled = false;
            judgeBtn.textContent = "로그인";
            return;
        }

        await checkAndRedirect(data.user.email);
        judgeBtn.disabled = false;
        judgeBtn.textContent = "로그인";
    });
}

/* ----------------------------------------------------------
   이메일 허용 여부 확인 후 리다이렉트
---------------------------------------------------------- */
async function checkAndRedirect(email) {
    if (ALLOWED_EMAILS.length === 0) {
        // 허용 목록이 비어있으면 경고 표시
        showError("⚠️ 허용된 이메일 목록이 비어 있습니다.\nlogin.js의 ALLOWED_EMAILS에 이메일을 추가해 주세요.");
        await db.auth.signOut();
        return;
    }

    if (ALLOWED_EMAILS.includes(email)) {
        window.location.href = "dashboard.html";
    } else {
        await db.auth.signOut();
        showError(`접근 권한이 없습니다.\n(${email})`);
        resetBtn();
    }
}

/* ----------------------------------------------------------
   헬퍼
---------------------------------------------------------- */
function showError(msg) {
    messageEl.textContent = msg;
    messageEl.className = "";
}

function resetBtn() {
    googleBtn.classList.remove("loading");
    googleBtn.innerHTML = `
        <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google 계정으로 로그인`;
}
