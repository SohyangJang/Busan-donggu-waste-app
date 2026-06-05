function nKo(s){
  return s.toLowerCase()
    .replace(/[^가-힣a-z0-9 ]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function nEn(s){
  return s.toLowerCase()
    .replace(/[^a-z0-9 ]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function nVi(s){
  return s.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/đ/g,"d")
    .replace(/[^a-z0-9 ]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function nZh(s){
  return s.replace(/\s+/g,"").toLowerCase();
}
