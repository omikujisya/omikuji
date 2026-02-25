const container = document.getElementById("fall-paper");

if (container) {

  const saved = sessionStorage.getItem("omikujiPaper");

  if (saved) {

    container.innerHTML = saved;

    const paper = container.querySelector(".omikuji-outer");

    if (paper) {

      paper.classList.remove("tied"); 

      paper.removeAttribute("style");

      paper.style.position = "absolute";
      paper.style.left = "50%";
      paper.style.top = "50%";
      paper.style.transform = "translate(-50%, -50%)";
      paper.style.opacity = "0";
      paper.style.animation = "none";

      requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{

    paper.style.animation =
      "paperFly 3.2s cubic-bezier(.22,.8,.22,1) forwards";

    paper.addEventListener("animationend", () => {
    paper.style.animation = "none";   // ←これ追加で再計算防止
    paper.style.opacity = "0";
});
  });
});     

    }

  }

}

const homeBtn=document.querySelector(".back-home");
if(homeBtn){
  homeBtn.classList.add("locked");
}

/* ===== 吸い込み後に配置用紙を出す ===== */
setTimeout(()=>{

  const scene = document.querySelector(".tie-scene");
  if(!scene) return;
 
  const small = document.createElement("img");
  small.src = "img/small.svg";
  small.style.position="absolute";

  /* ★スマホは画面比例サイズ、PCは固定 */
  small.style.width = window.innerWidth < 600 ? "14vw" : "90px";

  small.style.left="50%";
  small.style.top="50%";
  small.style.transform="translate(-50%,-50%)";
  small.style.zIndex="15";
  small.style.cursor="pointer";
  small.style.pointerEvents="auto"; 

  scene.appendChild(small);

  let placed=false;

  function move(e){
    if(placed) return;

    const rect = scene.getBoundingClientRect();

    small.style.left=(e.clientX-rect.left)+"px";
    small.style.top=(e.clientY-rect.top)+"px";
  }

  const isMobile = window.matchMedia("(pointer:coarse)").matches;

if(!isMobile){

  // PC → 追従
  document.addEventListener("mousemove",move);

}else{

  // スマホ → タップ位置へ瞬間移動のみ
  function moveTouch(e){
    const rect = scene.getBoundingClientRect();
    small.style.left=(e.touches[0].clientX-rect.left)+"px";
    small.style.top=(e.touches[0].clientY-rect.top)+"px";
  }

  document.addEventListener("touchstart",moveTouch,{passive:true});

}
  
 function place(e){

  if(placed) return;

/* ★戻るボタン押した時は無視 */
  if(e.target.closest(".back-home")) return;

  if(!scene.contains(e.target)) return;

  placed=true;

  document.removeEventListener("mousemove",move);
  if(typeof moveTouch==="function"){
  document.removeEventListener("touchstart",moveTouch);
}
  scene.removeEventListener("click",place);

    small.style.cursor="default";

    /* ===== 運勢取得 ===== */
    const params=new URLSearchParams(location.search);
    const fortune=params.get("fortune");

    /* ===== メッセージ分岐 ===== */
    let text="";

    if(fortune==="凶" || fortune==="大凶"){
      text="凶運を此処に留めて良い運勢が結実しますように...。";
    }else{
      text="あなたの願い事がしっかりと結ばれますように...。";
    }

    /* ===== メッセージ生成 ===== */
    const msg=document.createElement("div");
    msg.className="final-message";
    msg.innerHTML=text;

    scene.appendChild(msg);

    setTimeout(()=>{
      msg.classList.add("show");
      
      const suzu=new Audio("audio/suzu.mp3");
      playSound(suzu,0.5);

    },80);

    if(homeBtn){
  homeBtn.classList.remove("locked");

  small.style.pointerEvents="none";
  }
  }


  /* ←これが消えてた */
  scene.addEventListener("click",place);

},3300);


if(homeBtn){
  homeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    homeBtn.classList.add("tap");

    setTimeout(()=>{
      location.href="index.html";
    },300);
  });
}
