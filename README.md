# 어디에 버리지? — 부산광역시 생활폐기물 배출안내 서비스

> 부산광역시 16개 구·군 주민을 위한 음식물·생활폐기물 분리배출 안내 PWA 웹앱입니다.  
> 직원이 주민 편의 증대를 위해 자발적으로 기획·개발하였습니다.

---

## 🏆 2026 공공 AI 대전환 챌린지 (세션 1) — 심사 안내

### 접속 주소
- 시민 화면: https://sohyangjang.github.io/Busan-donggu-waste-app/
- 관리자 대시보드: https://sohyangjang.github.io/Busan-donggu-waste-app/admin/login.html

### 주요 기능
- 5개 국어(한·영·중·베·러) 분리배출 검색, 부산 16개 구·군별 배출요일·문의처 안내 (PWA)
- 정확히 일치하지 않는 검색 결과는 정답처럼 보이지 않도록 "유사 품목" 안내와 함께 표시
- **관리자 대시보드**: 검색 성공률·실패 키워드·언어별 현황·최근 7일 추이·CSV 내보내기
- **검색 실패 품목 AI 분석 (모델 2종 비교)**: 검색에 실패한 품목을 **Gemini와 Upstage Solar에 동시에** 보내 분류·등록 필요 여부·5개 국어 등록 후보를 받고, 한 화면에서 나란히 비교합니다. AI는 초안만 만들고 최종 판단과 등록은 담당자가 합니다.
- **실패 검색어 정리**: 같은 검색어는 한 줄로 합쳐 횟수를 표시하고, 이미 DB에 반영된 검색어는 `✅ 추가 완료`, AI가 등록 대상이 아니라고 본 검색어는 `등록 대상 아님`, 두 모델 판단이 엇갈리면 `검토 필요`로 표시합니다.

### 실행·작동 방법
1. **시민 화면**: 위 주소에 접속해 품목(예: `달걀껍데기`, `마늘`)을 검색합니다. 언어와 구·군을 바꿔 볼 수 있습니다.
2. **관리자 대시보드**: 로그인 화면에서 **"심사위원 로그인 (이메일)"** 을 펼쳐 구동안내서에 적힌 계정으로 로그인합니다. (읽기 전용 임시 계정이며, 계정 정보는 구동안내서에 있습니다.)
3. 대시보드의 **검색 실패 목록**에서 품목 옆 **AI 분석**을 누르면 비교 창이 열리고, 왼쪽 Gemini·오른쪽 Solar의 분석 결과(분류·등록 필요 여부·5개 국어 등록 후보)가 나란히 표시됩니다. (Solar는 응답에 10초 안팎이 걸릴 수 있습니다.)
4. 등록 후보의 **복사** 버튼은 `data.js`에 그대로 붙여 넣을 수 있는 한 줄 형식으로 복사합니다. 담당자가 내용을 확인해 `data.js`에 반영·배포하면, 같은 검색어가 시민 화면에서 정확히 안내되고 실패 목록에는 `✅ 추가 완료`가 표시됩니다.

---

## 📱 주요 기능

### 🔍 품목 검색
- 생활폐기물 품목명을 입력하면 **음식물쓰레기 / 일반쓰레기 / 특수처리** 여부와 올바른 배출 방법을 즉시 안내
- 검색어와 정확히 일치하는 결과를 우선 표시
- 검색 실패 시 중앙정부 표준 [『분리의 정석』 분리배출 품목사전](https://분리배출.kr) 연결 (같은 검색어로 바로 조회, 식별 정보 미전달)
- KakaoTalk 채널 연동 제보 기능 (오류 신고 / 품목 추가 요청)

### 🌏 5개 언어 지원
| 언어 | 코드 |
|------|------|
| 한국어 | `ko` |
| English | `en` |
| 中文 | `zh` |
| Tiếng Việt | `vi` |
| Русский | `ru` |

### 🗺️ 부산광역시 16개 구·군 지원
구·군을 선택하면 해당 지역의 배출요일 이미지, 미수거 문의 연락처, 대형폐기물 신고·수거 정보가 자동으로 업데이트됩니다.

| 구군 | 구군 | 구군 | 구군 |
|------|------|------|------|
| 동구 | 중구 | 서구 | 영도구 |
| 부산진구 | 동래구 | 남구 | 북구 |
| 해운대구 | 사하구 | 금정구 | 강서구 |
| 연제구 | 수영구 | 사상구 | 기장군 |

### 📅 배출요일 안내
- 구·군별 + 언어별 배출요일 이미지 제공
- 이미지가 없는 구·군은 공식 누리집 링크로 안내

### ☎️ 미수거 문의 · 대형폐기물 신고
- 구·군별 동 단위 환경업체 연락처 제공
- 대형폐기물 전화 신고 및 온라인 수거 신청 링크 제공

### 📦 PWA (Progressive Web App)
- 홈 화면에 설치 가능 (iOS / Android / PC)
- 오프라인 캐싱 지원 (`service-worker.js`)

---

## 🏗️ 기술 스택

| 구분 | 기술 |
|------|------|
| 프론트엔드 | Vanilla HTML / CSS / JavaScript |
| 백엔드 | [Supabase](https://supabase.com) (PostgreSQL + Edge Functions) |
| AI 분석 | Supabase Edge Function (`ai-analyze-failed-search`) — Google Gemini, Upstage Solar (교체 가능) |
| 차트 | Chart.js (관리자 대시보드) |
| PWA | Web App Manifest + Service Worker |

---

## 📁 프로젝트 구조

```
Busan-donggu-waste-app/
├── index.html                  # 메인 페이지
├── app.js                      # 핵심 앱 로직 (검색·언어·구군 전환)
├── data.js                     # 폐기물 품목 DB (5개 언어)
├── districts.js                # 구·군 데이터 (16개 구·군)
├── utils.js                    # 유틸리티 함수
├── supabase.js                 # Supabase 클라이언트 설정
├── style.css                   # 메인 스타일시트
├── manifest.json               # PWA 매니페스트
├── service-worker.js           # 오프라인 캐싱
├── schedule-*.jpg              # 구·군별·언어별 배출요일 이미지
├── admin/
│   ├── login.html              # 관리자 로그인
│   ├── dashboard.html          # 관리자 대시보드
│   ├── dashboard.js            # 대시보드 로직
│   ├── dashboard.css           # 대시보드 스타일
│   └── login.css / login.js
└── supabase/
    ├── functions/
    │   └── ai-analyze-failed-search/
    │       └── index.ts        # 검색 실패 품목 AI 분석 Edge Function (Gemini·Solar)
    ├── ai-analysis-results.sql # AI 판단 저장 표 + 조회 권한(RLS)
    ├── judge-account.sql       # 심사용 계정·조회 권한 (심사 후 정리 구문 포함)
    └── rls-check-and-recommended.sql  # search_logs 권한 점검·권장안
```

---

## 🖥️ 관리자 대시보드 (`/admin`)

Supabase 기반 검색 로그를 시각화하는 관리자 페이지입니다.

- **총 검색건수 / 오늘 검색건수**
- **검색 성공률 / QR 유입률**
- **최근 7일 검색량** 차트 (Chart.js)
- **언어별 검색 현황**
- **검색 유형별 현황** (음식물 / 일반 / 특수 / 없음)
- **TOP 10 검색어**
- **검색 실패 목록** — 중복 합치기(횟수), `추가 완료`·`등록 대상 아님`·`검토 필요` 표시, Gemini·Solar 비교 분석
- **최근 검색 목록**
- CSV 다운로드 기능

---

## 🤖 AI Edge Function

`supabase/functions/ai-analyze-failed-search/index.ts`

검색에 실패한 품목을 AI로 분석하여 담당자가 검토할 **후보 데이터**를 만듭니다.
- 폐기물 분류 (`food` / `general`)와 DB 등록 필요 여부·근거
- 5개 언어 검색어·설명·배출 방법 초안 (`data.js` 형식)
- 대시보드가 현재 DB에서 찾은 **정확히 일치·유사 품목**을 함께 보내, 이미 있는 품목을 다시 등록하라고 하지 않도록 합니다.
- 관리자 로그인 토큰과 `ADMIN_EMAILS`로 호출자를 검증하며, 판단 결과는 `ai_analysis_results` 표에 저장됩니다(검색어·언어·모델·판단만, 개인정보 없음).

### LLM 연결 설정·모델 교체

AI 호출부는 `callGemini()` / `callSolar()` 함수로 분리되어 있어, 같은 계열 모델은 Supabase Secret 값만, 다른 회사 모델은 호출 함수 하나만 추가하면 교체할 수 있습니다.

| Secret | 용도 | 기본값 |
|------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 키 | — |
| `GEMINI_MODEL` | Gemini 모델명 (선택) | `gemini-3.5-flash-lite` |
| `UPSTAGE_API_KEY` (또는 `SOLAR_API_KEY`) | Upstage Solar API 키 | — |
| `SOLAR_MODEL` | Solar 모델명 (선택) | `solar-pro4` |
| `AI_PROVIDER` | 요청에 모델 지정이 없을 때 쓸 기본 모델 (`gemini` / `solar`, 선택) | `gemini` |
| `ADMIN_EMAILS` | AI 분석을 호출할 수 있는 관리자 이메일(쉼표 구분) | — |

```bash
# 설정 예시
supabase secrets set UPSTAGE_API_KEY=... SOLAR_MODEL=solar-pro4
# 배포 (Windows에서는 작업 폴더 밖에서 --workdir 로 지정: 폴더의 supabase.js 와 이름이 겹치지 않도록)
npx supabase functions deploy ai-analyze-failed-search --project-ref <프로젝트 ref> --workdir <작업 폴더 경로>
```

AI 판단 저장 표는 `supabase/ai-analysis-results.sql`을 Supabase SQL Editor에서 한 번 실행해 만듭니다.

---

## 🔒 개인정보·보안

- 회원가입·개인 식별 정보를 받지 않습니다. 검색 기록은 검색어·결과 유형·언어·유입 경로(QR/web)만 저장합니다.
- 검색 기록과 AI 판단 결과는 RLS로 허용된 관리자 계정만 조회할 수 있습니다.
- 외부 서비스(분리의 정석, 카카오톡 채널, 지도)는 식별 정보를 넘기지 않는 링크 방식으로 연결합니다.
- 대시보드 출력은 HTML 이스케이프로 XSS를 막습니다.

---

## 🚀 로컬 실행

별도 빌드 과정 없이 정적 파일로 실행됩니다.

```bash
# 간단히 로컬 서버로 실행 (예: VS Code Live Server, Python 등)
python -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

Supabase 연동이 필요한 경우 `app.js` 상단의 `SUPABASE_URL`과 `SUPABASE_KEY`를 확인하세요.

---

## 📝 구·군 데이터 추가/수정

`districts.js`의 각 구·군 객체에서 다음 필드를 수정하면 됩니다:

```js
{
  id: "donggu",
  name: "동구",
  scheduleImages: { ko: "schedule-ko.jpg", en: "schedule-en.jpg", ... },
  contacts: [{ area: "...", areaEn: "...", tel: "...", label: "..." }],
  bulk: [{ area: "...", tel: "...", url: "...", urlLabel: "..." }],
  foodstoreUrl: "...",   // 음식물 전용용기 판매소 지도 링크
  stickersaleUrl: "..."  // 납부필증 판매소 지도 링크
}
```

---

## 📄 라이선스

본 서비스는 주민 편의를 위해 개인이 자발적으로 기획·개발하였습니다.