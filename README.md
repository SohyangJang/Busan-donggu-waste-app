# 어디에 버리지? — 부산광역시 생활폐기물 배출안내 서비스

> 부산광역시 16개 구·군 주민을 위한 음식물·생활폐기물 분리배출 안내 PWA 웹앱입니다.  
> 직원이 주민 편의 증대를 위해 자발적으로 기획·개발하였습니다.

---

## 🏆 2026 공공 AI 대전환 챌린지 (세션 1) — 심사 안내

### 접속 주소
- 운영 서비스(시민 화면): https://sohyangjang.github.io/Busan-donggu-waste-app/
- 관리자 대시보드(운영): https://sohyangjang.github.io/Busan-donggu-waste-app/admin/ — 지정된 담당자 계정(구글 로그인)만 접근할 수 있어, 심사위원은 아래 **심사용 데모**로 같은 흐름을 확인합니다.

### 주요 기능
- 5개 국어(한·영·중·베·러) 분리배출 검색, 부산 16개 구·군별 배출요일·문의처 안내 (PWA)
- 정확히 일치하지 않는 검색 결과는 정답처럼 보이지 않도록 "유사 품목" 안내와 함께 표시
- **운영 관리자 대시보드**: 검색 성공률·실패 키워드·언어별 현황·CSV 내보내기, 검색 실패 품목을 Gemini로 분석해 분류·5개 국어 설명·DB 등록 코드 초안 생성(담당자가 확인 후 등록)
- **`judge-demo`(확장 프로토타입)**: 위 AI 분석을 "AI 후보 → 서버 검증 → 담당자 승인 → 서비스 즉시 반영" 폐쇄 루프로 확장한 버전

### 실행·작동 방법

| 확인하려는 것 | 방법 | 필요한 것 |
|---|---|---|
| 시민 화면 | 위 운영 서비스 주소 접속 | 브라우저 |
| **관리자 흐름 확장 프로토타입**(검색 실패 → AI 분석 → 승인 → 재검색) | [`judge-demo/`](judge-demo/README.md) 에서 `npm start` | Node.js 22 이상 (외부 계정·인터넷·패키지 설치 불필요) |

```bash
cd judge-demo
npm start      # 콘솔에 표시되는 시민 화면·관리자 화면 주소를 브라우저로 열기
```

- `judge-demo`는 모의 검색 로그 900건(실제 시민 데이터 아님)과 모의 AI 모델이 내장되어 있습니다.
- AI 모델은 환경변수(`LLM_PROVIDER`, `LLM_MODEL`, `LLM_BASE_URL`, `LLM_API_KEY`)만으로 Gemini 또는 OpenAI 호환 API(기관 LLM 게이트웨이 등)로 교체할 수 있습니다. 자세한 방법은 [`judge-demo/README.md`](judge-demo/README.md) 를 참고하세요.
- 운영 앱의 AI 분석은 Supabase Edge Function(Gemini)이며 관리자 인증이 필요합니다. 운영 관리자 화면은 시연영상으로 확인할 수 있습니다.

---

## 📱 주요 기능

### 🔍 품목 검색
- 생활폐기물 품목명을 입력하면 **음식물쓰레기 / 일반쓰레기 / 특수처리** 여부와 올바른 배출 방법을 즉시 안내
- 검색어와 정확히 일치하는 결과를 우선 표시
- 검색 실패 시 [분리배출 품목사전](https://분리배출.kr) 외부 링크 제공
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
| AI 분석 | Supabase Edge Function (`ai-analyze-failed-search`) — 검색 실패 품목 자동 분류 |
| PWA | Web App Manifest + Service Worker |
| UI 라이브러리 | [krds-uiux](https://www.npmjs.com/package/krds-uiux) |

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
    └── functions/
        └── ai-analyze-failed-search/
            └── index.ts        # 검색 실패 품목 AI 분석 Edge Function
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
- **검색 실패 목록** — AI Edge Function 연동으로 자동 분류 가능
- **최근 검색 목록**
- CSV 다운로드 기능

---

## 🤖 AI Edge Function

`supabase/functions/ai-analyze-failed-search/index.ts`

검색에 실패한 품목을 Gemini AI로 분석하여 아래 정보를 자동 생성합니다:
- 폐기물 분류 (`food` / `general` / `special`)
- DB 등록 필요 여부 판단
- 5개 언어 품목 설명 및 배출 방법 초안

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