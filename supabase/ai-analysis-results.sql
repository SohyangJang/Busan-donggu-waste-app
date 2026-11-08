-- =====================================================================
-- AI 분석 결과 저장 표 (ai_analysis_results)
--
-- 목적: 검색 실패 목록에서 AI가 이미 판단한 검색어에
--       "등록 대상 아님"(두 모델 모두 일반쓰레기) / "검토 필요"(판단이 엇갈림) 표시를 붙이기 위함.
-- 쓰기: Edge Function(ai-analyze-failed-search)이 서버 권한(service role)으로만 저장합니다.
--       → 별도 insert 정책을 만들지 않으므로 브라우저(anon·로그인 사용자)는 쓸 수 없습니다.
-- 읽기: search_logs 와 같은 관리자 이메일만 조회할 수 있습니다.
-- 개인정보: 검색어·언어·모델·판단 결과만 저장하며 사용자 식별 정보는 저장하지 않습니다.
--
-- 실행: Supabase 대시보드 > SQL Editor 에 이 파일 전체를 붙여 넣고 Run.
-- =====================================================================

create table if not exists public.ai_analysis_results (
  id                bigint generated always as identity primary key,
  keyword           text        not null check (char_length(keyword) between 1 and 100),
  language          text        not null default 'ko' check (language in ('ko','en','zh','vi','ru')),
  provider          text        not null check (provider in ('gemini','solar')),
  model             text,
  category          text,
  need_registration boolean,
  reason            text,
  created_at        timestamptz not null default now()
);

create index if not exists ai_analysis_results_lookup
  on public.ai_analysis_results (language, keyword, created_at desc);

alter table public.ai_analysis_results enable row level security;

drop policy if exists "Admin select ai_analysis_results" on public.ai_analysis_results;
create policy "Admin select ai_analysis_results"
on public.ai_analysis_results for select
to authenticated
using ( (auth.jwt() ->> 'email') in ('yabaezzae@gmail.com', 'judge.demo@example.com') );

-- 확인
select policyname, roles, cmd, qual from pg_policies where tablename = 'ai_analysis_results';

-- 심사 종료 후 심사용 계정 정리 시 (judge-account.sql 정리와 함께 실행)
-- drop policy if exists "Admin select ai_analysis_results" on public.ai_analysis_results;
-- create policy "Admin select ai_analysis_results"
-- on public.ai_analysis_results for select to authenticated
-- using ( (auth.jwt() ->> 'email') = 'yabaezzae@gmail.com' );
