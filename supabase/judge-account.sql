-- ============================================================
-- 심사위원용 임시 계정 설정 / 정리 (Supabase SQL Editor에서 실행)
-- 대상 계정: judge.demo@example.com  (읽기 전용 — 쓰기·삭제 권한 없음)
-- ============================================================

-- [0단계] 공개 전 점검 (읽기 전용): 검색어에 개인정보처럼 보이는 값이 있는지 확인
--   결과가 0건이면 문제 없음. 있으면 해당 행을 확인하세요.
select id, keyword, created_at
from public.search_logs
where keyword ~ '[0-9]{4,}'      -- 숫자 4자리 이상(전화번호 등)
   or keyword ~ '@'              -- 이메일
   or char_length(keyword) > 30  -- 비정상적으로 긴 입력
order by created_at desc
limit 50;

-- [1단계] 읽기 허용 목록에 심사위원 계정 추가 (기존 관리자 정책을 교체)
drop policy if exists "Admin select search_logs" on public.search_logs;
create policy "Admin select search_logs"
on public.search_logs for select to authenticated
using ( (auth.jwt() ->> 'email') in ('yabaezzae@gmail.com', 'judge.demo@example.com') );

-- [확인] 정책 목록
select policyname, roles, cmd, qual from pg_policies where tablename = 'search_logs';

-- ============================================================
-- [심사 종료 후 정리] 아래를 실행하고, 대시보드에서 계정을 삭제하세요.
--   (Authentication > Users > judge.demo@example.com > Delete user)
--   터미널: supabase secrets set ADMIN_EMAILS=yabaezzae@gmail.com
-- ============================================================
-- drop policy if exists "Admin select search_logs" on public.search_logs;
-- create policy "Admin select search_logs"
-- on public.search_logs for select to authenticated
-- using ( (auth.jwt() ->> 'email') = 'yabaezzae@gmail.com' );
