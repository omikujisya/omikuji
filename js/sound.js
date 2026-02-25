function isSoundEnabled(){
  return sessionStorage.getItem("soundEnabled")==="true";
}

function playSound(audio,volume=0.5){
  if(!audio) return;
  if(!isSoundEnabled()) return;
  audio.volume=volume;
  audio.currentTime=0;
  audio.play().catch(()=>{});
}

/* ===== 音ON/OFFトグル（←ここ追加が本体）===== */

const toggleBtn = document.getElementById("sound-toggle");
const icon = document.getElementById("sound-icon");

let soundEnabled = sessionStorage.getItem("soundEnabled");

if(soundEnabled===null){
  soundEnabled="true";
  sessionStorage.setItem("soundEnabled","true");
}

function updateButton(){
  if(!icon) return;
  icon.src = soundEnabled==="true"
    ? "img/otoon.svg"
    : "img/otooff.svg";
}

updateButton();

if(toggleBtn){
  toggleBtn.addEventListener("click",()=>{
    soundEnabled = soundEnabled==="true" ? "false" : "true";
    sessionStorage.setItem("soundEnabled",soundEnabled);
    updateButton();

    /* ★これ追加 */
    if(soundEnabled==="false"){
      document.querySelectorAll("audio").forEach(a=>{
        a.pause();
        a.currentTime=0;
      });
    }

  });
}

/* ===== ボタン押下アニメ ===== */

document.querySelectorAll(".ui-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.add("tap");
    setTimeout(()=>btn.classList.remove("tap"),180);
  });
});