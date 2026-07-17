const SUPABASE_URL = "https://ootgfnycumxevuilhmwl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdGdmbnljdW14ZXZ1aWxobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzAyMDIsImV4cCI6MjA5OTgwNjIwMn0.bk5abiU_GzTYYCx1Vww5NOnRc85AxdyaTj9IAZyVE5w";

// 이제 순서가 보장되므로 안심하고 바로 클라이언트를 생성합니다.
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


function nKo(s){return s.toLowerCase().replace(/[^가-힣a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nEn(s){return s.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nVi(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nZh(s){return s.replace(/\s+/g,"").toLowerCase();}
function nRu(s){  return String(s||"").toLowerCase().replace(/ё/g,"е").replace(/[^\u0400-\u04FFa-z0-9 ]/g," ").replace(/\s+/g," ").trim();}


let cur="ko";

// [20260717추가] Supabase에 검색 로그를 비동기로 저장하는 함수
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
          language: lang, // 전달받은 언어(ko, en 등)가 여기에 대입됩니다.
          source: 'web' 
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

function setLang(k){
  cur=k;
  const l=LANGS[k];
  document.querySelectorAll(".lb").forEach(b=>b.classList.toggle("on",b.dataset.l===k));
  document.getElementById("h1title").innerHTML=l.ui.h1;
  document.getElementById("h1sub").textContent=l.ui.sub;
  document.getElementById("slb").textContent=l.ui.slb;
  document.getElementById("q").placeholder=l.ui.ph;
  document.getElementById("sb").textContent=l.ui.btn;
  document.getElementById("fn").innerHTML=l.ui.fine;
  document.getElementById("chip-lbl").textContent=l.ui.clbl;
  buildChips(l);
  document.getElementById("ra").innerHTML=`<div class="empty"><div class="ico">&#128465;</div><p>${l.ui.empty.replace("\n","<br>")}</p></div>`;
  document.getElementById("q").value="";
  updateScheduleImage();
}

function buildChips(l){
  const c=document.getElementById("ch");
  c.innerHTML="";
  l.sg.forEach(s=>{
    const el=document.createElement("span");
    el.className="chip";el.textContent=s;
    el.onclick=()=>{document.getElementById("q").value=s;go();};
    c.appendChild(el);
  });
}

function go(){
  const raw=document.getElementById("q").value.trim();
  const l=LANGS[cur];
  const q=l.norm(raw);
  if(!q)return;

  //1.검색결과매칭
  const area=document.getElementById("ra");
  const matches=l.db.filter(item=>item.t.some(t=>{
    const nt=l.norm(t);
    return nt.includes(q)||q.includes(nt)||(nt.split(" ").some(w=>w.length>1&&q.includes(w)));
  }));
  
  // 2. [핵심] 찾은 결과물에서 카테고리 정보(m.c)를 동적으로 추출합니다.
  // 검색 결과가 있으면 첫 번째 결과의 카테고리(food, general 등)를 쓰고, 없으면 'none'으로 처리합니다.
  let detectedType = "none";
  if (matches && matches.length > 0) {
    detectedType = matches[0].c; 
  }

  //3. Supabase에 검색 로그 저장
 saveSearchLog(raw, detectedType, cur);
  
  if(!matches.length){

  let html = `<div class="nf">${l.ui.nf(raw)}</div>`;

  // 한국어에서만 분리배출.kr 안내
  if(cur === "ko"){

    const url =
      "https://xn--oy2b29bd3a601b.kr/front/dischargeMethod/dictionary.do?niIdx=&pageIndex=1&searchCnd=1&searchWrd="
      + encodeURIComponent(raw);

    html += `
      <div class="external-search">
        <p style="margin-top:15px;">
          동구청 DB에 없는 품목입니다.
        </p>

        <a href="${url}"
           target="_blank"
           class="external-btn">
           🔍 분리배출 품목사전에서 검색하기
        </a>

      </div>
    `;
  }

  area.innerHTML = html;
  return;
}
  area.innerHTML=matches.map(m=>{
    const bl=l.ui.bl[m.c];
    const ko=m.c==="food"?"음식물쓰레기봉투":m.c==="general"?"종량제봉투":"";
    return`<div class="rc ${m.c}">
      <div class="rh">
        <span class="bdg ${m.c}">${l.ui.tl[m.c]}</span>
        ${bl?`<div class="btag">${bl}<small>${ko}</small></div>`:""}
      </div>
      <div class="rname">${m.d}</div>
      <div class="divider"></div>
      <div class="hlb">${l.ui.how}</div>
      <div class="steps">${m.s.map((s,i)=>`<div class="step"><span class="sn ${m.c}">${i+1}</span><span>${s}</span></div>`).join("")}</div>
    </div>`;
  }).join("");
}

function updateScheduleImage(){

  const images={
    ko:"schedule-ko.jpg",
    en:"schedule-en.jpg",
    zh:"schedule-zh.jpg",
    vi:"schedule-vi.jpg",
    ru:"schedule-ru.jpg"
  };

  const titles={
    ko:"요일별 배출요령",
    en:"Collection Schedule",
    zh:"投放日期指南",
    vi:"Hướng dẫn ngày đổ rác",
    ru:"График вывоза отходов"
  };

  document.getElementById("schedule-image").src=images[cur];
  document.getElementById("schedule-link").href=images[cur];
  document.getElementById("schedule-title").textContent=titles[cur];
}


const lr=document.getElementById("lr");
Object.entries(LANGS).forEach(([k,v])=>{
  const b=document.createElement("button");
  b.className="lb";b.dataset.l=k;
  b.textContent=v.name;
  b.onclick=()=>setLang(k);
  lr.appendChild(b);
});
document.getElementById("q").addEventListener("keydown",e=>{if(e.key==="Enter")go();});
setLang("ko");


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
