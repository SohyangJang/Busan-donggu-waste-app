const SUPABASE_URL = "https://ootgfnycumxevuilhmwl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdGdmbnljdW14ZXZ1aWxobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzAyMDIsImV4cCI6MjA5OTgwNjIwMn0.bk5abiU_GzTYYCx1Vww5NOnRc85AxdyaTj9IAZyVE5w";

// Supabase 클라이언트 생성
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function nKo(s){return s.toLowerCase().replace(/[^가-힣a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nEn(s){return s.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nVi(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nZh(s){return s.replace(/\s+/g,"").toLowerCase();}
function nRu(s){return String(s||"").toLowerCase().replace(/ё/g,"е").replace(/[^\u0400-\u04FFa-z0-9 ]/g," ").replace(/\s+/g," ").trim();}

let cur = "ko";
let curDistrict = "donggu"; // 현재 선택된 구군

const params = new URLSearchParams(window.location.search);
const source = params.get("source") || "web";
const districtParam = params.get("district");

// Supabase에 검색 로그를 비동기로 저장하는 함수
async function saveSearchLog(searchWord, resultType = 'general', lang = 'ko') {
  if (!searchWord || !searchWord.trim()) return;
  if (!window.supabaseClient) {
    console.error("Supabase 클라이언트가 로드되지 않았습니다.");
    return;
  }

  try {
    const { data, error } = await window.supabaseClient
      .from('search_logs')
      .insert([
        { 
          keyword: searchWord, 
          result_type: resultType, 
          language: lang, 
          source: source 
        }
      ]);

    if (error) {
      console.error("Supabase 저장 실패:", error.message);
    } else {
      console.log("Supabase 저장 성공!");
    }
  } catch (err) {
    console.error("Supabase 통신 에러:", err);
  }
}

// ─────────────────────────────────────────────────
// 구군 선택기 초기화
// ─────────────────────────────────────────────────
function initDistrictSelect() {
  const sel = document.getElementById("districtSelect");
  if (!sel) return;

  DISTRICT_ORDER.forEach(id => {
    const d = DISTRICTS[id];
    if (!d) return;
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `${d.name} (${d.nameEn})`;
    sel.appendChild(opt);
  });

  if (districtParam && DISTRICTS[districtParam]) {
    sel.value = districtParam;
    curDistrict = districtParam;
  } else {
    sel.value = curDistrict;
  }

  sel.addEventListener("change", () => {
    curDistrict = sel.value;
    renderDistrictSections(curDistrict, cur);
    updateScheduleImage();
  });
}



  // ─────────────────────────────────────────────────
// 구군별 콘텐츠 렌더링
// ─────────────────────────────────────────────────
function renderDistrictSections(districtId, lang) {
  const d = DISTRICTS[districtId];
  if (!d) return;

  const badgeEl = document.getElementById("govBadgeText");
  if (badgeEl) badgeEl.textContent = d.badge;

  const govLink = document.getElementById("govLink");
  if (govLink) govLink.href = d.govUrl;

  const dongguTitle = document.getElementById("dongguTitle");
  const dongguSub = document.getElementById("dongguSub");
  if (dongguTitle) dongguTitle.textContent = d.govTitle[lang] || d.govTitle.ko;
  if (dongguSub) dongguSub.textContent = d.govSub[lang] || d.govSub.ko;

  // ─────────────────────────────────────────────
  // [추가] 배출요일 일정 이미지 및 링크 동적 교체
  // ─────────────────────────────────────────────
  const scheduleImg = document.getElementById("schedule-image");
  const scheduleLink = document.getElementById("schedule-link");

if (scheduleImg && scheduleLink) {

  if (d.scheduleImages) {

    const scheduleUrl =
      typeof d.scheduleImages === "string"
        ? d.scheduleImages
        : (d.scheduleImages[lang] || d.scheduleImages.ko);

    scheduleImg.src = scheduleUrl;
    scheduleLink.href = scheduleUrl;
    scheduleImg.style.display = "block";

  } else {

    // 이미지가 없는 구 처리
    scheduleImg.src = "schedule-ko.jpg";
    scheduleLink.href = d.govUrl;
    scheduleImg.style.display = "block";

  }
}

  const lbSec = document.getElementById("link-buttons-section");
  if (lbSec) {
    let lbHtml = "";
    if (d.foodstoreUrl) {
      lbHtml += `<a class="link-btn" href="${d.foodstoreUrl}" target="_blank" rel="noopener noreferrer">
        📍 ${d.name} 음식물류폐기물 전용용기 판매소 위치보기
      </a>`;
    }
    if (d.stickersaleUrl) {
      lbHtml += `<a class="link-btn" href="${d.stickersaleUrl}" target="_blank" rel="noopener noreferrer">
        🛒 음식물쓰레기 60L 납부필증 판매소 위치보기
      </a>`;
    }
    lbSec.innerHTML = lbHtml ? `<div class="link-buttons">${lbHtml}</div>` : "";
  }

  const contactSec = document.getElementById("contact-section");
  if (contactSec) {
    contactSec.className = "contact-section";
    const contactItems = d.contacts.map(c => `
      <div class="contact-item">
        <div class="area">
          ${c.area}<br>
          <span>${c.areaEn}</span>
        </div>
        <a class="phone" href="tel:${c.tel}">
          ☎ ${formatTel(c.tel)}${c.label ? " " + c.label : ""}
        </a>
      </div>
    `).join("");

    contactSec.innerHTML = `
      <div class="contact-title">
        미수거 문의 안내 · Collection Inquiry
      </div>
      <div class="contact-grid">
        ${contactItems}
      </div>
    `;
  }

  
    const bulkSec = document.getElementById("bulk-section");
  if (bulkSec) {
    bulkSec.className = "bulk-section";

    const bulkItems = d.bulk.map(b => {
      // 1. 전화 연결 버튼
      const telBtn = b.tel
        ? `<a class="bulk-phone" href="tel:${b.tel}">
             ☎ ${formatTel(b.tel)} ${b.label || ''}
           </a>`
        : '';

      // 2. 웹사이트 이동 버튼
      const urlBtn = b.url
        ? `<a class="bulk-phone" href="${b.url}" target="_blank" rel="noopener noreferrer">
             🌐 ${b.label || ''} ${b.urlLabel || '온라인 수거 신청'} →
           </a>`
        : '';

      // 3. 버튼 결합
      const actionButtons = `${telBtn}${urlBtn}`;

      return `
        <div class="bulk-item">
          <div class="area">
            ${b.area}<br>
            <span>${b.areaEn}</span>
          </div>
          ${actionButtons}
        </div>
      `;
    }).join("");

    bulkSec.innerHTML = `
      <div class="bulk-title">
        대형폐기물 신고 및 수거
      </div>
      <div class="bulk-grid">
        ${bulkItems}
      </div>
    `;
  }
}

function formatTel(tel) {
  const t = tel.replace(/\D/g, "");
  if (t.length === 11) return t.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  if (t.length === 10) return t.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  if (t.length === 9)  return t.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  return tel;
}

function setLang(k){
  cur = k;
  const l = LANGS[k];
  document.querySelectorAll(".lb").forEach(b => b.classList.toggle("on", b.dataset.l === k));
  document.getElementById("h1title").innerHTML = l.ui.h1;
  document.getElementById("h1sub").textContent = l.ui.sub;
  document.getElementById("slogan").textContent = l.ui.slogan;
  document.getElementById("hero-highlight").textContent = l.ui.highlight;

  document.getElementById("quick1Title").textContent = l.ui.quick1Title;
  document.getElementById("quick1Sub").textContent = l.ui.quick1Sub;
  document.getElementById("quick2Title").textContent = l.ui.quick2Title;
  document.getElementById("quick2Sub").textContent = l.ui.quick2Sub;
  document.getElementById("quick3Title").textContent = l.ui.quick3Title;
  document.getElementById("quick3Sub").textContent = l.ui.quick3Sub;

  document.getElementById("slb").textContent = l.ui.slb;
  document.getElementById("q").placeholder = l.ui.ph;
  document.getElementById("sb").textContent = l.ui.btn;
  document.getElementById("fn").innerHTML = l.ui.fine;
  document.getElementById("chip-lbl").textContent = l.ui.clbl;
  buildChips(l);

  const searchHeading = document.getElementById("search-heading");
  const searchDesc = document.getElementById("search-desc");
  if (searchHeading) searchHeading.style.display = k === "ko" ? "block" : "none";
  if (searchDesc) searchDesc.style.display = k === "ko" ? "block" : "none";

  const recycleHint = document.getElementById("recycle-hint");
  if (recycleHint) recycleHint.style.display = k === "ko" ? "block" : "none";

  document.getElementById("ra").innerHTML = `<div class="empty"><div class="ico">&#128465;</div><p>${l.ui.empty.replace("\n","<br>")}</p></div>`;
  document.getElementById("q").value = "";
  updateScheduleImage();
  renderDistrictSections(curDistrict, k);

 
}

function buildChips(l){
  const c = document.getElementById("ch");
  c.innerHTML = "";
  l.sg.forEach(s => {
    const el = document.createElement("span");
    el.className = "chip";
    el.textContent = s;
    el.onclick = () => { document.getElementById("q").value = s; go(); };
    c.appendChild(el);
  });
}

function go(){
  const raw = document.getElementById("q").value.trim();
  const l = LANGS[cur];
  const q = l.norm(raw);
  if (!q) return;

  const area = document.getElementById("ra");
  const matches = l.db.filter(item => item.t.some(t => {
    const nt = l.norm(t);
    return nt.includes(q) || q.includes(nt) || (nt.split(" ").some(w => w.length > 1 && q.includes(w)));
  }));

// 검색어와 정확히 일치하는 품목을 먼저 표시
  matches.sort((a, b) => {
  const aExact = a.t.some(t => l.norm(t) === q);
  const bExact = b.t.some(t => l.norm(t) === q);

  if (aExact && !bExact) return -1;
  if (!aExact && bExact) return 1;

  return 0;
});
  
  let detectedType = "none";
  if (matches && matches.length > 0) {
    detectedType = matches[0].c; 
  }

  saveSearchLog(raw, detectedType, cur);

  if (!matches.length) {
    let html = `<div class="nf">${l.ui.nf(raw)}</div>`;
    if (cur === "ko") {
      const url = "https://xn--oy2b29bd3a601b.kr/front/dischargeMethod/dictionary.do?niIdx=&pageIndex=1&searchCnd=1&searchWrd=" + encodeURIComponent(raw);
      html += `
        <div class="external-search">
          <p style="margin-top:15px;">음식물 유래 폐기물 DB에 없는 품목입니다.</p>
          <a href="${url}" target="_blank" class="external-btn">🔍 분리배출 품목사전에서 검색하기</a>
        </div>
      `;
    }
    area.innerHTML = html;
    showFeedback(raw);
    return;
  }

  area.innerHTML = matches.map(m => {
    const bl = l.ui.bl[m.c];
    const ko = m.c === "food" ? "음식물쓰레기전용용기" : m.c === "general" ? "종량제봉투" : "";
    return `<div class="rc ${m.c}">
      <div class="rh">
        <span class="bdg ${m.c}">${l.ui.tl[m.c]}</span>
        ${bl ? `<div class="btag">${bl}<small>${ko}</small></div>` : ""}
      </div>
      <div class="rname">${m.d}</div>
      <div class="divider"></div>
      <div class="hlb">${l.ui.how}</div>
      <div class="steps">${m.s.map((s, i) => `<div class="step"><span class="sn ${m.c}">${i+1}</span><span>${s}</span></div>`).join("")}</div>
    </div>`;
  }).join("");

  showFeedback(raw);
}

function updateScheduleImage(){
  const titles = {
    ko: "요일별 배출요령",
    en: "Collection Schedule",
    zh: "投放日期指南",
    vi: "Hướng dẫn ngày đổ rác",
    ru: "График вывоза отходов"
  };

  const noImageLabels = {
    ko: { msg: "해당 지역의 배출요일 안내 이미지가 준비 중입니다.", btn: "공식 누리집에서 확인하기 →" },
    en: { msg: "Schedule image for this district is not available yet.", btn: "Check the official website →" },
    zh: { msg: "该区域的投放日期图片尚未准备好。", btn: "查看官方网站 →" },
    vi: { msg: "Hình ảnh lịch đổ rác của khu vực này chưa có.", btn: "Xem trang web chính thức →" },
    ru: { msg: "Изображение расписания для этого района ещё не готово.", btn: "Открыть официальный сайт →" }
  };

  const d = DISTRICTS[curDistrict];
  const titleEl = document.getElementById("schedule-title");
  if (titleEl) titleEl.textContent = titles[cur];

  const wrap = document.getElementById("schedule-section-inner");
  if (!wrap) return;

  const imgs = d && d.scheduleImages;
  const imgSrc = imgs && imgs[cur];

  if (imgSrc) {
    wrap.innerHTML = `
      <a id="schedule-link" href="${imgSrc}" target="_blank">
        <img id="schedule-image" src="${imgSrc}" alt="${titles[cur]}">
      </a>
    `;
  } else {
    const lbl = noImageLabels[cur] || noImageLabels.ko;
    const govUrl = d ? d.govUrl : "#";
    const distName = d ? d.name : "";
    wrap.innerHTML = `
      <div class="schedule-noimage">
        <div class="schedule-noimage-icon">🗓️</div>
        <p class="schedule-noimage-msg">${distName} ${lbl.msg}</p>
        <a class="schedule-noimage-btn" href="${govUrl}" target="_blank" rel="noopener noreferrer">
          ${lbl.btn}
        </a>
      </div>
    `;
  }
}

// ─────────────────────────────────────────────────
// 제보 기능 (다국어 지원 적용)
// ─────────────────────────────────────────────────
function showFeedback(keyword = ""){
  const fb = document.getElementById("feedbackBox");
  if (!fb) return;
  fb.style.display = "block";

  // 언어별 UI 텍스트 정의
  const fbText = {
    ko: {
      title: "🔍 원하는 품목이 없나요?",
      desc: "찾으시는 품목이 없거나<br>검색 결과에 오류가 있다면 알려주세요.",
      btn: "💬 카카오톡으로 제보하기",
      template: (k) => `[어디에버리지 의견]\n\n검색어 : ${k}\n\n문의내용 :\n□ 검색되지 않음\n□ 분류 오류\n□ 번역 오류\n□ 기타\n`,
      copySuccess: "검색어가 복사되었습니다.\n\n카카오톡에서 붙여넣기 후 전송해주세요.",
      copyFail: "카카오톡으로 이동합니다.\n\n검색어를 직접 입력해서 제보해주세요."
    },
    en: {
      title: "🔍 Can't find your item?",
      desc: "Tell us about missing items<br>or incorrect search results.",
      btn: "💬 Report via KakaoTalk",
      template: (k) => `[Feedback]\n\nKeyword: ${k}\n\nIssue:\n□ Item missing\n□ Wrong classification\n□ Translation error\n□ Other\n`,
      copySuccess: "Keyword copied to clipboard.\n\nPlease paste it in KakaoTalk.",
      copyFail: "Opening KakaoTalk.\n\nPlease type your keyword to report."
    },
    zh: {
      title: "🔍 找不到想查询的物品吗？",
      desc: "如果未找到您搜索的物品<br>或发现分类/翻译错误，请告诉我们。",
      btn: "💬 通过 KakaoTalk 举报",
      template: (k) => `[意见反馈]\n\n搜索词: ${k}\n\n问题:\n□ 未找到\n□ 分类错误\n□ 翻译错误\n□ 其他\n`,
      copySuccess: "搜索词已复制到剪贴板。\n\n请在 KakaoTalk 中粘贴后发送。",
      copyFail: "正在跳转至 KakaoTalk。\n\n请手动输入搜索词进行反馈。"
    },
    vi: {
      title: "🔍 Không tìm thấy vật cần tìm?",
      desc: "Hãy cho chúng tôi biết nếu bị thiếu sản phẩm<br>hoặc kết quả tìm kiếm bị lỗi.",
      btn: "💬 Báo qua KakaoTalk",
      template: (k) => `[Ý kiến đóng góp]\n\nTừ khóa: ${k}\n\nNội dung:\n□ Không tìm thấy\n□ Phân loại sai\n□ Lỗi dịch\n□ Khác\n`,
      copySuccess: "Đã sao chép từ khóa.\n\nVui lòng dán vào KakaoTalk 및 gửi.",
      copyFail: "Mở KakaoTalk.\n\nVui lòng tự nhập từ khóa để báo cáo."
    },
    ru: {
      title: "🔍 Не нашли нужный предмет?",
      desc: "Сообщите нам, если предмет отсутствует<br>или найдена ошибка в результатах.",
      btn: "💬 Сообщить через KakaoTalk",
      template: (k) => `[Отзыв]\n\nКлючевое слово: ${k}\n\nПроблема:\n□ Не найдено\n□ Ошибка категории\n□ Ошибка перевода\n□ Другое\n`,
      copySuccess: "Ключевое слово скопировано.\n\nВставьте его в KakaoTalk.",
      copyFail: "Переход в KakaoTalk.\n\nВведите ключевое слово вручную."
    }
  };

  const t = fbText[cur] || fbText.ko;

  fb.innerHTML = `
    <div class="feedback-card">
      <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <button id="feedbackBtn">
        ${t.btn}
      </button>
    </div>
  `;

  document.getElementById("feedbackBtn").onclick = async () => {
    const text = t.template(keyword);

    try {
      await navigator.clipboard.writeText(text);
      alert(t.copySuccess);
    } catch(e) {
      alert(t.copyFail);
    }

    window.open("https://pf.kakao.com/_HwHxnX/chat", "_blank");
  };
}  

function openFeedback(){
  const qVal = document.getElementById("q") ? document.getElementById("q").value.trim() : "";
  showFeedback(qVal);
} 

function hideFeedback(){
  const fb = document.getElementById("feedbackBox");
  if (fb) fb.innerHTML = "";
}


// 이벤트 리스너 및 초기화
const lr = document.getElementById("lr");
if (lr) {
  Object.entries(LANGS).forEach(([k, v]) => {
    const b = document.createElement("button");
    b.className = "lb"; 
    b.dataset.l = k;
    b.textContent = v.name;
    b.onclick = () => setLang(k);
    lr.appendChild(b);
  });
}

document.getElementById("q").addEventListener("keydown", e => {
  if (e.key === "Enter") go();
});

// PWA 서비스워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

// 초기화 실행
initDistrictSelect();
setLang("ko");