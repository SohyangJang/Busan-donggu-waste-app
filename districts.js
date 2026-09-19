/**
 * districts.js
 * 부산광역시 16개 구군 데이터
 *
 * scheduleImages 필드 설명:
 *   - 각 언어 코드(ko/en/zh/vi/ru)별 이미지 경로 또는 URL을 지정합니다.
 *   - null이면 해당 구군의 공식 누리집 안내 카드를 표시합니다.
 *   - 로컬 파일("schedule-ko.jpg") 또는 외부 URL 모두 지원합니다.
 *
 * 나중에 구군별 이미지가 생기면 scheduleImages 항목을 채워 넣으면 됩니다.
 * 예시:
 *   scheduleImages: {
 *     ko: "schedule-junggu-ko.jpg",   // 로컬 파일
 *     en: "https://...",              // 외부 URL
 *     zh: null, vi: null, ru: null   // 없으면 null
 *   }
 */

const DISTRICTS = {

  /* ── 동구 (기본값 · 기존 앱) ─────────────────────── */
  donggu: {
    id: "donggu",
    name: "동구",
    nameEn: "Dong-gu",
    badge: "BUSAN DONG-GU",
    govUrl: "https://www.bsdonggu.go.kr/index.donggu?menuCd=DOM_000000104005003000",
    govTitle: { ko: "부산 동구 공식누리집", en: "Busan Dong-gu Official Website", zh: "釜山东区官方网站", vi: "Trang web Dong-gu Busan", ru: "Официальный сайт Дон-гу Пусан" },
    govSub:   { ko: "음식물류폐기물 배출안내 바로가기 →", en: "Food Waste Disposal Guide →", zh: "厨余垃圾分类指南 →", vi: "Hướng dẫn xử lý rác thực phẩm →", ru: "Руководство по утилизации →" },
    // 동구 전용 배출요일 이미지 (5개 언어)
    scheduleImages: {
      ko: "schedule-ko.jpg",
      en: "schedule-en.jpg",
      zh: "schedule-zh.jpg",
      vi: "schedule-vi.jpg",
      ru: "schedule-ru.jpg"
    },
    contacts: [
      { area: "초량동 · 수정1·2·4동", areaEn: "Choryang · Sujeong 1,2,4-dong", tel: "0516365633", label: "동부환경" },
      { area: "수정5동 · 좌천동 · 범일동", areaEn: "Sujeong 5 · Jwacheon · Beomil-dong", tel: "0516310933", label: "부산환경" }
    ],
    bulk: [
      { area: "초량동 · 수정1·2·4동", areaEn: "Choryang · Sujeong 1,2,4-dong", tel: "01045377515" },
      { area: "수정5동 · 좌천동 · 범일동", areaEn: "Sujeong 5 · Jwacheon · Beomil-dong", tel: "01045267515" }
    ],
    foodstoreUrl: "https://naver.me/5uloCfds",
    stickersaleUrl: "https://naver.me/I5wszTJd"
  },

  /* ── 중구 ─────────────────────────────────────── */
  junggu: {
    id: "junggu",
    name: "중구",
    nameEn: "Jung-gu",
    badge: "BUSAN JUNG-GU",
    govUrl: "https://www.bsjunggu.go.kr/index.junggu?menuCd=DOM_000000109001001001",
    govTitle: { ko: "부산 중구 공식누리집", en: "Busan Jung-gu Official Website", zh: "釜山中区官方网站", vi: "Trang web Jung-gu Busan", ru: "Официальный сайт Чун-гу Пусан" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-junggu.jpg",
      en: "schedule-junggu.jpg",
      zh: "schedule-junggu.jpg",
      vi: "schedule-junggu.jpg",
      ru: "schedule-junggu.jpg"
    },
    contacts: [
      { area: "동광동, 보수동, 부평동, 영주1동, 영주2동 6개 공동주택(흥아거북맨션, 금호타운, 동아아파트, 동주파크맨션, 영주아파트 2동 가, 나, 다, 라, 3동 나, 라, 동남파크맨션)", areaEn: "Jung-gu 1 Areas", tel: "051244-0441", label: "(주)영진" },
      { area: "중앙동, 대청동, 광복동, 남포동, 영주2동(6개 공동주택 제외)", areaEn: "Jung-gu 2 Areas", tel: "051242-8850", label: "(주)신아환경" }
    ],
    bulk: [
      { area: "중구 전 지역", areaEn: "Jung-gu All Areas", url: "https://yeogiro24.co.kr/web/index.html", label: "여기로 사이트", urlLabel: "온라인 수거 신청"}
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 서구 ─────────────────────────────────────── */
  seogu: {
    id: "seogu",
    name: "서구",
    nameEn: "Seo-gu",
    badge: "BUSAN SEO-GU",
    govUrl: "https://www.bsseogu.go.kr/index.bsseogu?menuCd=DOM_000000102004002006",
    govTitle: { ko: "부산 서구 공식누리집", en: "Busan Seo-gu Official Website", zh: "釜山西区官方网站", vi: "Trang web Seo-gu Busan", ru: "Официальный сайт Со-гу Пусан" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-seogu.jpg",
      en: "schedule-seogu.jpg",
      zh: "schedule-seogu.jpg",
      vi: "schedule-seogu.jpg",
      ru: "schedule-seogu.jpg"
    },
    contacts: [
      { area: "동대신동, 서대신동, 부민동, 아미동, 충무동", areaEn: "Seo-gu 1 Areas", tel: "0512429520", label: "(주)두산환경" },
      { area: "초장동, 남부민동, 암남동", areaEn: "Seo-gu 2 Areas", tel: "0512431351", label: "(주)대원개발" }
    ],
    bulk: [
      { area: "서구 전 지역", areaEn: "Seo-gu All Areas", tel: "0519008488", label: "모두환경" }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 영도구 ───────────────────────────────────── */
  yeongdogu: {
    id: "yeongdogu",
    name: "영도구",
    nameEn: "Yeongdo-gu",
    badge: "BUSAN YEONGDO-GU",
    govUrl: "https://www.yeongdo.go.kr/00672/01898/00863.web",
    govTitle: { ko: "부산 영도구 공식누리집", en: "Busan Yeongdo-gu Official Website", zh: "釜山影岛区官方网站", vi: "Trang web Yeongdo-gu Busan", ru: "Официальный сайт Ёндо-гу Пусан" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-yeongdogu.jpg",
      en: "schedule-yeongdogu.jpg",
      zh: "schedule-yeongdogu.jpg",
      vi: "schedule-yeongdogu.jpg",
      ru: "schedule-yeongdogu.jpg"
     },
    contacts: [
      { area: "남항동, 영선1·2동, 신선동, 봉래1동", areaEn: "Yeongdo-gu 1 Areas", tel: "0514177500", label: "(주)영도환경" },
      { area: "봉래2동, 청학1·2동, 동삼1·2·3동", areaEn: "Yeongdo-gu 2 Areas", tel: "0514045565", label: "금정환경(주)" }
    ],
    bulk: [
      { area: "영도구 전 지역", areaEn: "Yeongdo-gu All Areas", tel: "0517170102", label: "(주)모두환경" }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 부산진구 ─────────────────────────────────── */
  busanjingu: {
    id: "busanjingu",
    name: "부산진구",
    nameEn: "Busanjin-gu",
    badge: "BUSAN BUSANJIN-GU",
    govUrl: "https://www.busanjin.go.kr/index.busanjin?menuCd=DOM_000000105006001000",
    govTitle: { ko: "부산 부산진구 공식누리집", en: "Busanjin-gu Official Website", zh: "釜山釜山镇区官方网站", vi: "Trang web Busanjin-gu", ru: "Официальный сайт Пусанджин-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-busanjingu.jpg",
      en: "schedule-busanjingu.jpg",
      zh: "schedule-busanjingu.jpg",
      vi: "schedule-busanjingu.jpg",
      ru: "schedule-busanjingu.jpg"
     },
    contacts: [
      { area: "부전동, 양정동, 부암1동", areaEn: "Busanjin-gu 1 Areas", tel: "0518091864", label: "화성환경(주)" },
      { area: "전포2동, 부암3동, 당감동, 개금3동", areaEn: "Busanjin-gu 2 Areas", tel: "0518958382", label: "(주)명신환경" },
      { area: "가야동, 개금1동, 개금2동, 범천2동", areaEn: "Busanjin-gu ３ Areas", tel: "0518912359", label: "(주)남양산업" },
      { area: "초읍동, 연지동, 전포1동, 범천1동", areaEn: "Busanjin-gu ４ Areas", tel: "0515080006", label: "(주)케이알씨산업" }
    ],
    bulk: [
      { area: "부전1동, 연지동, 초읍동, 양정동, 부암동, 당감동", areaEn: "Busanjin-gu 1 Areas", 
        tel: "0518925900", label: "백양환경 주식회사",
        url: "https://smartstore.naver.com/baek-yang/products/5602548391", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
      },
      { area: "부전2동, 전포동, 가야동, 개금동, 범천동", areaEn: "Busanjin-gu 2 Areas", 
        tel: "0518626070", label: "유한회사 우리환경",
              url: "https://smartstore.naver.com/uuri/products/5600092289", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
      }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 동래구 ───────────────────────────────────── */
  dongnaegu: {
    id: "dongnaegu",
    name: "동래구",
    nameEn: "Dongnae-gu",
    badge: "BUSAN DONGNAE-GU",
    govUrl: "https://www.dongnae.go.kr/index.dongnae?menuCd=DOM_000000105009001007",
    govTitle: { ko: "부산 동래구 공식누리집", en: "Dongnae-gu Official Website", zh: "釜山东莱区官方网站", vi: "Trang web Dongnae-gu", ru: "Официальный сайт Тоннэ-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-dongnaegu.jpg",
      en: "schedule-dongnaegu.jpg",
      zh: "schedule-dongnaegu.jpg",
      vi: "schedule-dongnaegu.jpg",
      ru: "schedule-dongnaegu.jpg"
     },

    contacts: [
      { area: "온천동·사직동", areaEn: "Dongnae-gu 1 Areas", tel: "0516240303", label: "(주)정도환경" },
      { area: "수민동·복산동·명륜동·안락동·명장동", areaEn: "Dongnae-gu 2 Areas", tel: "0515540552", label: "진양기업사" }
    ],
    bulk: [
      { area: "동래구 전 지역", areaEn: "Dongnae-gu All Areas", tel: "0515521022", label: "우리환경" }      
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 남구 ─────────────────────────────────────── */
  namgu: {
    id: "namgu",
    name: "남구",
    nameEn: "Nam-gu",
    badge: "BUSAN NAM-GU",
    govUrl: "https://www.bsnamgu.go.kr/index.namgu?menuCd=DOM_000003501000000000",
    govTitle: { ko: "부산 남구 공식누리집", en: "Nam-gu Official Website", zh: "釜山南区官方网站", vi: "Trang web Nam-gu", ru: "Официальный сайт Нам-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages:{
      ko: "schedule-namgu-ko.jpg",
      en: "schedule-namgu-en.jpg",
      zh: "schedule-namgu-zh.jpg",
      vi: "schedule-namgu.jpg",
      ru: "schedule-namgu.jpg"
     },
    contacts: [
      { area: "대연 1·3·4·5동", areaEn: "Nam-gu 1 Areas", tel: "0516268131", label: "선도산업" },
      { area: "용호 1·2·3·4동, 용당동", areaEn: "Nam-gu 2 Areas", tel: "0516281236", label: "보수산업" },
      { area: "대연6동, 감만 1·2동, 우암동, 문현 1·2·3·4동", areaEn: "Nam-gu 3 Areas", tel: "0516248282", label: "대방환경" }
    ],
    bulk: [
      { area: "남구 전 지역", areaEn: "Nam-gu All Areas", tel: "0516317868", label: "경인산업"},
      { area: "남구 전 지역", areaEn: "Nam-gu All Areas", tel: "0516284373", label: "고려산업"},

    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 북구 ─────────────────────────────────────── */
  bukgu: {
    id: "bukgu",
    name: "북구",
    nameEn: "Buk-gu",
    badge: "BUSAN BUK-GU",
    govUrl: "https://www.bsbukgu.go.kr/index.bsbukgu?menuCd=DOM_000000103005001003&cpath=",
    govTitle: { ko: "부산 북구 공식누리집", en: "Buk-gu Official Website", zh: "釜山北区官方网站", vi: "Trang web Buk-gu", ru: "Официальный сайт Бук-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-bukgu.jpg",
      en: "schedule-bukgu.jpg",
      zh: "schedule-bukgu.jpg",
      vi: "schedule-bukgu.jpg",
      ru: "schedule-bukgu.jpg"
     },
    contacts: [
      { area: "구포1･2･3동, 금곡동, 화명1･3동, 화명2동 단독주택(재활용)", areaEn: "Buk-gu 1 Areas", tel: "0513347300", label: "(주)청미산업" },
      { area: "덕천2동, 만덕1･2･3동, 화명2동(일반,음식물)", areaEn: "Buk-gu 2 Areas", tel: "0513438318", label: "성신환경(주)" },           
      { area: "덕천1･3동, 북구 전지역 공동주택(재활용품)", areaEn: "Buk-gu 3 Areas", tel: "0513381181", label: "(주)삼정GS" }
    ],
    bulk: [
      { area: "북구 전 지역", areaEn: "Buk-gu All Areas", tel: "0513364433", label: "(주)모두환경",
              url: "https://smartstore.naver.com/hjstkd4433/products/7702258251", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
        }
      
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 해운대구 ─────────────────────────────────── */
  haeundaegu: {
    id: "haeundaegu",
    name: "해운대구",
    nameEn: "Haeundae-gu",
    badge: "BUSAN HAEUNDAE-GU",
    govUrl: "https://www.haeundae.go.kr/index.do?menuCd=DOM_000000102014001000",
    govTitle: { ko: "부산 해운대구 공식누리집", en: "Haeundae-gu Official Website", zh: "釜山海云台区官方网站", vi: "Trang web Haeundae-gu", ru: "Официальный сайт Хэундэ-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-haeundaegu.jpg",
      en: "schedule-haeundaegu.jpg",
      zh: "schedule-haeundaegu.jpg",
      vi: "schedule-haeundaegu.jpg",
      ru: "schedule-haeundaegu.jpg"
     },
    contacts: [
      { area: "반여2․3동, 재송1․2동", areaEn: "Haeundae-gu 1 Areas", tel: "0517462720", label: "(주) 청도" },
      { area: "반송1․2동, 반여1․4동", areaEn: "Haeundae-gu 2 Areas", tel: "0517021201", label: "해동환경(주)" },
      { area: "우1~3동, 좌1․4동", areaEn: "Haeundae-gu 3 Areas", tel: "0517430562", label: "(주)신해환경" },
      { area: "좌2․3동, 중1․2동, 송정동", areaEn: "Haeundae-gu 4 Areas", tel: "0517220557", label: "(주)희망환경" }
    ],
    bulk: [
      { area: "해운대구 전 지역", areaEn: "Haeundae-gu All Areas", tel: "0517823511",label: "민하산업" },
      { area: "해운대구 전 지역", areaEn: "Haeundae-gu All Areas", tel: "0517020111",label: "센텀환경" }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 사하구 ───────────────────────────────────── */
  sahagu: {
    id: "sahagu",
    name: "사하구",
    nameEn: "Saha-gu",
    badge: "BUSAN SAHA-GU",
    govUrl: "https://www.saha.go.kr/",
    govTitle: { ko: "부산 사하구 공식누리집", en: "Saha-gu Official Website", zh: "釜山沙下区官方网站", vi: "Trang web Saha-gu", ru: "Официальный сайт Саха-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-sahagu.jpg",
      en: "schedule-sahagu.jpg",
      zh: "schedule-sahagu.jpg",
      vi: "schedule-sahagu.jpg",
      ru: "schedule-sahagu.jpg"
     },
    contacts: [
      { area: "괴정 1,2,3동, 하단 1,2동", areaEn: "Saha-gu 1 Areas", tel: "0512648301", label: "세화산업" },
      { area: "괴정4동, 당리동, 신평1동, 장림2동, 다대 1,2동", areaEn: "Saha-gu 2 Areas", tel: "0512640894", label: "미진산업" },
      { area: "신평2동, 장림1동, 구평동, 감천 1,2동", areaEn: "Saha-gu 3 Areas", tel: "0512072030", label: "동진산업" }
    ],
    bulk: [
      { area: "사하구 전 지역", areaEn: "Saha-gu All Areas", tel: "0512661170",label: "맑은사하환경" }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 금정구 ───────────────────────────────────── */
  geumjeonggu: {
    id: "geumjeonggu",
    name: "금정구",
    nameEn: "Geumjeong-gu",
    badge: "BUSAN GEUMJEONG-GU",
    govUrl: "https://www.geumjeong.go.kr/index.geumj?menuCd=DOM_000000133007000000",
    govTitle: { ko: "부산 금정구 공식누리집", en: "Geumjeong-gu Official Website", zh: "釜山金井区官方网站", vi: "Trang web Geumjeong-gu", ru: "Официальный сайт Кымджон-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-guemjeong-ko.jpg",
      en: "schedule-guemjeong-en.jpg",
      zh: "schedule-guemjeong-zh.jpg",
      vi: "schedule-.jpg",
      ru: "schedule-.jpg"
     },
    contacts: [
      { area: "청룡노포동, 남산동, 구서2동", areaEn: "Geumjeong-gu 1 Areas", tel: "0515828572", label: "부광자원(주)" },
      { area: "부곡1,4동, 장전동, 구서1동, 금성동", areaEn: "Geumjeong-gu 2 Areas", tel: "0515142212", label: "(주)세명기업사" },
      { area: "서동, 금사회동동, 부곡2,3동, 선두구동", areaEn: "Geumjeong-gu 3 Areas", tel: "0515211003", label: "현대실업" }
    ],
    bulk: [
      { area: "금정구 전 지역", areaEn: "Geumjeong-gu All Areas", tel: "0515269787", label: "(유)우리환경",
       url: "https://smartstore.naver.com/uuri4600/products/7630438973", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
       }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 강서구 ───────────────────────────────────── */
  gangseogu: {
    id: "gangseogu",
    name: "강서구",
    nameEn: "Gangseo-gu",
    badge: "BUSAN GANGSEO-GU",
    govUrl: "https://www.bsgangseo.go.kr/portal/contents.do?mid=0304010100",
    govTitle: { ko: "부산 강서구 공식누리집", en: "Gangseo-gu Official Website", zh: "釜山江西区官方网站", vi: "Trang web Gangseo-gu", ru: "Официальный сайт Кансо-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-gangseo-ko.jpg",
      en: "schedule-gangseo-en.jpg",
      zh: "schedule-.jpg",
      vi: "schedule-.jpg",
      ru: "schedule-.jpg"
     },
    contacts: [
      { area: "대저1~2동, 강동동, 가락동", areaEn: "Gangseo-gu 1 Areas", tel: "0519737787", label: "(주)대원공영" },
      { area: "명지1~2동, 녹산동, 신호동, 가덕도동", areaEn: "Gangseo-gu 2 Areas", tel: "0519735030", label: "대도환경" }
    ],
    bulk: [
      { area: "강서구 전 지역", areaEn: "Gangseo-gu All Areas", tel: "0519727550", label: "부산광역시자원재활용센터",
       url: "https://https://bbegi.com/", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
       }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 연제구 ───────────────────────────────────── */
  yeonjegu: {
    id: "yeonjegu",
    name: "연제구",
    nameEn: "Yeonje-gu",
    badge: "BUSAN YEONJE-GU",
    govUrl: "https://www.yeonje.go.kr/portal/contents.do?mId=0602020100",
    govTitle: { ko: "부산 연제구 공식누리집", en: "Yeonje-gu Official Website", zh: "釜山莲堤区官方网站", vi: "Trang web Yeonje-gu", ru: "Официальный сайт Ёнджэ-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages:{
      ko: "schedule-yeonje.jpg",
      en: "schedule-yeonje.jpg",
      zh: "schedule-yeonje.jpg",
      vi: "schedule-yeonje.jpg",
      ru: "schedule-yeonje.jpg"
     },
    contacts: [
      { area: "거제1~4동, 연산2,5동", areaEn: "Yeonje-gu 1 Areas", tel: "0518535578", label: "(주)남강기업(구.진양)" },
      { area: "연산1,3,4,6,8,9동", areaEn: "Yeonje-gu 2 Areas", tel: "0517541512", label: "(주)연성기업" }
    ],
    bulk: [
     { area: "연제구 전 지역", areaEn: "Yeonje-gu All Areas", tel: "0517541512", label: "(주)연성기업",
       url: "https://www.yeogiro24.co.kr/web/index.html", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
       }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 수영구 ───────────────────────────────────── */
  suyeonggu: {
    id: "suyeonggu",
    name: "수영구",
    nameEn: "Suyeong-gu",
    badge: "BUSAN SUYEONG-GU",
    govUrl: "https://www.suyeong.go.kr/index.suyeong?menuCd=DOM_000000112005001000",
    govTitle: { ko: "부산 수영구 공식누리집", en: "Suyeong-gu Official Website", zh: "釜山水营区官方网站", vi: "Trang web Suyeong-gu", ru: "Официальный сайт Суён-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-suyeonggu.jpg",
      en: "schedule-suyeonggu.jpg",
      zh: "schedule-suyeonggu.jpg",
      vi: "schedule-suyeonggu.jpg",
      ru: "schedule-suyeonggu.jpg"
     },
    contacts: [
      { area: "남천1·2동, 광안1·2·3·4동", areaEn: "Suyeong-gu 1 Areas", tel: "0518020906", label: "(주)케이알씨환경" },
      { area: "수영동, 망미1·2동, 민락동", areaEn: "Suyeong-gu 2 Areas", tel: "0517560706", label: "(주)해동크린" }
    ],
    bulk: [
      { area: "수영구 전 지역", areaEn: "Suyeong-gu All Areas", tel: "0516281525",label: "대남환경" ,
       url: "https://www.suyeong.go.kr/index.suyeong?menuCd=DOM_000000107000000000&forwardUrl=http://www.suyeong.go.kr/board/write.suyeong%3fboardId=BBS_0000095%252526menuCd=DOM_000000112005005003%252526startPage=1&returnUrl=http://www.suyeong.go.kr/board/write.suyeong%3fboardId=BBS_0000095%252526menuCd=DOM_000000112005005003%252526startPage=1",
       urlLabel: "온라인 수거 신청"
      }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 사상구 ───────────────────────────────────── */
  sasanggu: {
    id: "sasanggu",
    name: "사상구",
    nameEn: "Sasang-gu",
    badge: "BUSAN SASANG-GU",
    govUrl: "https://www.sasang.go.kr/index.sasang?menuCd=DOM_000000110001001000&cpath=",
    govTitle: { ko: "부산 사상구 공식누리집", en: "Sasang-gu Official Website", zh: "釜山沙上区官方网站", vi: "Trang web Sasang-gu", ru: "Официальный сайт Сасан-гу" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages:  {
      ko: "schedule-sasanggu.jpg",
      en: "schedule-sasanggu-for.jpg",
      zh: "schedule-sasanggu-for.jpg",
      vi: "schedule-sasanggu-for.jpg",
      ru: "schedule-sasanggu-for.jpg"
     },
    contacts: [
      { area: "삼락동, 모라동, 덕포동, 괘법동", areaEn: "Sasang-gu 1 Areas", tel: "0513018201", label: "청신산업(주)" },
      { area: "감전동, 주례동, 학장동, 엄궁동", areaEn: "Sasang-gu 2l Areas", tel: "0513038260", label: "대성기업(주)" },
    ],
    bulk: [
      { area: "사상구 전 지역", areaEn: "Sasang-gu All Areas", tel: "0513244600", label: "유한회사 우리환경",
        url: "https://uuri.kr/", // 👈 URL 추가
        urlLabel: "온라인 수거 신청" // 👈 필요시 라벨 추가 (생략 가능, 생략시 기본값 '온라인 수거 신청'으로 동작)
      }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  },

  /* ── 기장군 ───────────────────────────────────── */
  gijanggun: {
    id: "gijanggun",
    name: "기장군",
    nameEn: "Gijang-gun",
    badge: "BUSAN GIJANG-GUN",
    govUrl: "https://www.gijang.go.kr/index.gijang?menuCd=DOM_000000104006001001",
    govTitle: { ko: "부산 기장군 공식누리집", en: "Gijang-gun Official Website", zh: "釜山机张郡官方网站", vi: "Trang web Gijang-gun", ru: "Официальный сайт Киджан-гун" },
    govSub:   { ko: "생활폐기물 배출안내 바로가기 →", en: "Waste Disposal Guide →", zh: "垃圾分类指南 →", vi: "Hướng dẫn xử lý rác →", ru: "Руководство по утилизации →" },
    scheduleImages: {
      ko: "schedule-gijanggun.jpg",
      en: "schedule-gijanggun.jpg",
      zh: "schedule-gijanggun.jpg",
      vi: "schedule-gijanggun.jpg",
      ru: "schedule-gijanggun.jpg"
     },
    contacts: [
      { area: "기장, 철마, 일광읍 일부[이천리(일광천 서측), 삼성리, 횡계리, 학리]", areaEn: "Gijang-gun 1 Areas", tel: "0517273345", label: "(주)동래위생공사" },
      { area: "장안, 정관, 일광읍 일부(1구역 제외 전역)", areaEn: "Gijang-gun 2 Areas", tel: "0517221900", label: "일광환경(주)" }
    ],
    bulk: [
      { area: "기장군 전 지역", areaEn: "Gijang-gun All Areas", tel: "0517924725", label: "기장군도시관리공단" }
    ],
    foodstoreUrl: "",
    stickersaleUrl: ""
  }

};

/** 구군 선택 순서 (UI 표시 순서) */
const DISTRICT_ORDER = [
  "donggu","junggu","seogu","yeongdogu","busanjingu",
  "dongnaegu","namgu","bukgu","haeundaegu","sahagu",
  "geumjeonggu","gangseogu","yeonjegu","suyeonggu",
  "sasanggu","gijanggun"
];
