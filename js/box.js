const box = document.querySelector(".omikuji-box");
const stick = document.getElementById("stick");
const sound = document.getElementById("sound-shake"); // audio（無い可能性あり）
document.addEventListener("click",(e)=>{
  const btn=e.target.closest("#sound-toggle");
  if(!btn) return;

  const enabled=sessionStorage.getItem("soundEnabled")==="true";

  // 音ONに戻した瞬間、揺れていれば再開
  if(enabled && sound && shaking){
    sound.currentTime=0;
    sound.play().catch(()=>{});
  }
});
const shakes = ["shake-big", "shake-mid", "shake-small"];
const volumes = [0.7, 0.5, 0.3]; // 揺れに合わせた音量

let index = 0;
let timer = null;
let canShake = false;
let shaking = false;   // ★今揺れているか

/* ===== 初期ロック ===== */
if (box) box.style.pointerEvents = "none";

/* ===== audio 初期設定（存在する時だけ） ===== */
if (sound) {
  sound.volume = 0.6;
  sound.loop = true;
}

/* ===== ページ表示後に解禁 ===== */
window.addEventListener("load", () => {
  setTimeout(() => {
    canShake = true;
    if (box) box.style.pointerEvents = "auto";
  }, 700);
});

/* ===== 揺れ開始 ===== */
function startShake() {
  if (!canShake || timer) return;

  // 音（最初の1回だけ再生）

  box.classList.remove(...shakes);
  box.classList.add(shakes[index]);

  // 揺れに合わせて音量調整
  if (sound) {
    sound.volume = volumes[index];
  }

  index = (index + 1) % shakes.length;

  timer = setInterval(() => {
    box.classList.remove(...shakes);
    box.classList.add(shakes[index]); 

    if (sound) {
      sound.volume = volumes[index];
    }

    index = (index + 1) % shakes.length;
  }, 1300);

  shaking = true;
}

/* ===== 揺れ停止 ===== */
function stopShake() {
  clearInterval(timer);
  timer = null;
  box.classList.remove(...shakes);

  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
  shaking = false;

}

/* ===== イベント ===== */
if (box) {

   box.addEventListener("click", () => {

    if(sound && sessionStorage.getItem("soundEnabled")!=="true"){
    sound.pause();
    sound.currentTime = 0;
  }

  if (!canShake) return;

  /* ★1回目クリック → 揺れ開始 */
  if (!shaking) {

    startShake();

    if(sound && sessionStorage.getItem("soundEnabled")==="true"){
      sound.currentTime = 0;
      sound.play().catch(()=>{});
    }

    return; // ←ここで終わる（棒出さない）
  }

  /* ★2回目クリック → 揺れ停止して棒出す */
  stopShake();
  if(sound){ sound.pause(); }

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  if(stick) stick.textContent = toKanji(randomNumber);

  stick.classList.add("show");

  let count = localStorage.getItem("omikujiCount");
  count = count ? parseInt(count) : 0;
  count++;
  localStorage.setItem("omikujiCount", count);

  sessionStorage.setItem("counted","true");
  
  setTimeout(() => {
    window.location.href = "omikuji.html?no=" + randomNumber;
  }, 900);   // ★停止後少し待つ
}); 

}


