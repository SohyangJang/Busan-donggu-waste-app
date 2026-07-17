
function nKo(s){return s.toLowerCase().replace(/[^가-힣a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nEn(s){return s.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nVi(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function nZh(s){return s.replace(/\s+/g,"").toLowerCase();}
function nRu(s){  return String(s||"").toLowerCase().replace(/ё/g,"е").replace(/[^\u0400-\u04FFa-z0-9 ]/g," ").replace(/\s+/g," ").trim();}


let cur="ko";

// [20260717추가] Supabase에 검색 로그를 비동기로 저장하는 함수
async function saveSearchLog(searchWord, resultType = 'general') {
  if (!searchWord || !searchWord.trim()) return;
  if (!window.supabaseClient) {
    console.error("Supabase 클라이언트가 로드되지 않았습니다.");
    return;
  }

  try {
    const { error } = await window.supabaseClient
      .from('search_logs')
      .insert([
        {
          keyword: searchWord.trim(),
          result_type: resultType,
          language: cur, // 현재 선택된 언어('ko', 'en' 등)를 자동으로 기록
          source: 'web'
        }
      ]);

    if (error) {
      console.error('Supabase 저장 실패:', error.message);
    } else {
      console.log('Supabase 저장 성공:', searchWord);
    }
  } catch (err) {
    console.error('네트워크 에러 발생:', err);
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
  const area=document.getElementById("ra");
  const matches=l.db.filter(item=>item.t.some(t=>{
    const nt=l.norm(t);
    return nt.includes(q)||q.includes(nt)||(nt.split(" ").some(w=>w.length>1&&q.includes(w)));
  }));
  if(!matches.length){area.innerHTML=`<div class="nf">${l.ui.nf(raw)}</div>`;return;}
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
