const {group:fortuneGroup, entry} = pickOmikuji();

function displayName(name){
  if(name.length === 2){
    return name[0] + "   " + name[1];
  }
  return name;
}

/* 🔔 音をここで取得 */
const suzu = document.getElementById("suzu");
const kane = document.getElementById("kane");

/* ===== 大吉カラー適用 ===== */
if (fortuneGroup.name === "大吉") {
  const paper = document.querySelector(".omikuji-outer");
  if (paper) {
    paper.classList.add("daikichi");
  }
}
/* ===== 大凶カラー適用 ===== */
if (fortuneGroup.name === "大凶") {
  const paper = document.querySelector(".omikuji-outer");
  if (paper) {
    paper.classList.add("daikyo");
  }
}

/* ===== 大吉大凶　音 ===== */
window.addEventListener("pageshow",()=>{

 if(fortuneGroup.name==="大吉"){
   const suzu=document.getElementById("suzu");
   if(suzu){
     let count=0;
     const play=()=>{
       playSound(suzu,0.4);
       count++;
       if(count<3) setTimeout(play,800);
     };
     play();
   }
 }

 if(fortuneGroup.name==="大凶"){
   const kane=document.getElementById("kane");
   playSound(kane,0.4);
 }

});

/* ===============================
   棒番号
================================ */
const params = new URLSearchParams(window.location.search);
const number = params.get("no");

if (number) {
  const kanjiNumber = toKanji(parseInt(number));
  const numEl = document.querySelector(".number");
  if(numEl){
    numEl.textContent = "第" + kanjiNumber + "番";
  }
}

/* ===============================
   HTML反映
================================ */
const el = document.querySelector(".fortune-main");
if(el){
  el.textContent = displayName(fortuneGroup.name);

  if(fortuneGroup.name.length === 2){
    el.style.letterSpacing="0.32em";
    el.style.transform="translateX(0.12em)";
  }else{
    el.style.letterSpacing="0.1em";
    el.style.transform="translateX(0)";
  }
}

const haikuEl = document.querySelector(".haiku");
if (haikuEl) {
  haikuEl.innerHTML = entry.haiku.join("<br>");
}

const pic=document.querySelector(".picture img");
if(pic) pic.src=entry.image;

const items = document.querySelectorAll(".fortune-item");
items.forEach((el, i) => {
  el.textContent = entry.items[i];
});



// 結ぶイベント
const tieBtn = document.querySelector(".tie-btn");
const paper = document.querySelector(".omikuji-outer");

if (tieBtn && paper) {
  tieBtn.addEventListener("click", () => {
if (suzu && isSoundEnabled()) {
    suzu.currentTime = 0;
    suzu.play().catch(()=>{});
  }

  const original =
  paper.cloneNode(true);

/* ★保存前に余計なstyleを全部削除 */
original.removeAttribute("style");

const paperHTML = original.outerHTML;
sessionStorage.setItem("omikujiPaper", paperHTML);


  paper.classList.add("tied");

  setTimeout(()=>{
    window.location.href="final.html?fortune="+encodeURIComponent(fortuneGroup.name);
  },900);

});
 
}



   




