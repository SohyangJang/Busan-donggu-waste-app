-- =====================================================================
-- search_logs 접근 정책(RLS) 점검 및 권장안
--
-- ⚠️ 이 파일은 "아직 적용되지 않았습니다." 자동으로 실행되지 않습니다.
--    Supabase 대시보드 > SQL Editor 에서 1단계를 먼저 실행해 현재 상태를 확인하세요.
--    (코드만으로는 현재 설정을 알 수 없어, 확인 없이 적용하면 기존 기능이 막힐 수 있습니다.)
-- =====================================================================

-- ── 1단계: 현재 상태 확인 (읽기 전용, 안전) ───────────────────────────
-- RLS 가 켜져 있는지
select relname, relrowsecurity as rls_enabled
from pg_class where relname = 'search_logs';

-- 현재 정책 목록 (roles 가 {anon} 이고 cmd 가 SELECT/ALL 이면 누구나 로그를 읽을 수 있다는 뜻)
select policyname, roles, cmd, qual, with_check
from pg_policies where tablename = 'search_logs';


-- ── 2단계: 권장 정책 (1단계 결과를 확인한 뒤 필요할 때만 실행) ─────────
-- 목표: 시민(anon)은 "쓰기만", 읽기는 관리자 이메일 로그인 사용자만.
--  · 시민 화면의 로그 저장(insert)은 계속 동작해야 한다.
--  · 대시보드(관리자 로그인 후 select)도 계속 동작해야 한다.

/*
alter table public.search_logs enable row level security;

-- (기존에 anon 이 읽을 수 있게 만든 정책이 있다면 1단계에서 이름을 확인해 먼저 삭제)
-- drop policy "기존정책이름" on public.search_logs;

-- 시민: 검증된 형식의 로그만 저장 가능 (비정상적으로 긴 값·이상한 값 차단)
create policy "logs_insert_public"
on public.search_logs for insert
to anon, authenticated
with check (
  char_length(keyword) between 1 and 100
  and language    in ('ko','en','zh','vi','ru')
  and result_type in ('food','general','special','none')
  and coalesce(source, 'web') in ('web','qr')
);

-- 관리자: 허용 이메일로 로그인한 경우에만 조회 가능
create policy "logs_select_admin"
on public.search_logs for select
to authenticated
using ( (auth.jwt() ->> 'email') = 'yabaezzae@gmail.com' );
*/
