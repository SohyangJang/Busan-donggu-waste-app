const SUPABASE_URL = "https://ootgfnycumxevuilhmwl.supabase.co";
const SUPABASE_KEY = "sb_publishable__sFQUs8WzrIi7JsYvZSfBQ_6hApSfx2";

// HTML에서 불러온 CDN(window.supabase)을 이용하여 클라이언트를 생성합니다.
window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
