/* ===== トップ：引くボタン鈴音 ===== */

const drawBtn = document.querySelector(".draw-btn");
const startSuzu = document.getElementById("suzu-start");

if(drawBtn){

  drawBtn.addEventListener("click",(e)=>{

    if(startSuzu && isSoundEnabled()){

      e.preventDefault();

      startSuzu.currentTime = 0;
      startSuzu.play().catch(()=>{});

      setTimeout(()=>{
      window.location.href = drawBtn.href;
    },900);

    }

  });

}

/* ===============================
   日時・和暦・六曜表示
================================ */

const timeArea = document.getElementById("omikuji-time");

if(timeArea){

  const now = new Date();

  // 和暦
  const eraFormatter = new Intl.DateTimeFormat(
    "ja-JP-u-ca-japanese",
    { era: "long", year: "numeric" }
  );
  const wareki = eraFormatter.format(now);

  // 月日
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 時刻
  let hour = now.getHours();
  const minute = now.getMinutes();
  const ampm = hour < 12 ? "午前" : "午後";
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;
  const min = minute.toString().padStart(2,"0");

  // 六曜
  const rokuyo = getRokuyo(now.getFullYear(),month,day);

  // 文字列作成
  const dateText = `${wareki}${month}月${day}日`;
  const timeText = `${ampm}${hour}時${min}分`;

  // 表示
  timeArea.innerHTML =
    `<div class="date-main">${dateText}　${rokuyo}　${timeText}</div>`;
}


/* ===============================
   来訪人数表示
================================ */

const todayKey = new Date().toISOString().slice(0,10);

let todayData = JSON.parse(localStorage.getItem("todayVisitor") || "{}");
if(todayData.date !== todayKey){
  todayData = {date:todayKey,count:0};
}

let total = parseInt(localStorage.getItem("totalVisitor") || "0");

/* ★ここ追加：1回だけカウント */
if(sessionStorage.getItem("counted") === "true"){
  todayData.count++;
  total++;

  localStorage.setItem("todayVisitor",JSON.stringify(todayData));
  localStorage.setItem("totalVisitor", total);

  sessionStorage.removeItem("counted"); // ←増えたら消す
}

// 表示
const tc = document.getElementById("today-count");
const tt = document.getElementById("total-count");

if(tc && tt){
  tc.innerHTML =
    `本日<span class="count-num">${todayData.count}</span>人目　これまで<span class="count-num">${total}</span>名参拝`;
  tt.innerHTML = "";   // 2行目消す
}


