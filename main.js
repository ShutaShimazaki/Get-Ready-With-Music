let wakeup_hour;
let wakeup_minute;
let wakeup_time;

let leaving_time;
let prepare_min;
let dif_hour;
let dif_min;
let dif_totalmin;

let nowTime;
let nowYear;
let nowMonth;
let nowDate;
let nowHour;
let nowMin;
let nowSec;

let nowTime_unix;
let wakeupDate;
let wakeupDate_unix;

let readyTime;
let ready = 0;

wakeup_time_area = document.getElementById("wakeup_time_area");
leaving_time_area = document.getElementById("leaving_time_area");
msg_wakeup_area = document.getElementById("msg_wakeup_area");



// アラームセット
set_btn.addEventListener('click', function(){

	//入力した起床時間、出発時間を取得
	//起床時間
	wakeup_hour =document.alarm.wakeup_hour.value;
	wakeup_minute =document.alarm.wakeup_minute.value;
	wakeup_time = "セットした起床時間は"+wakeup_hour+"時"+wakeup_minute+"分"
	// //出発時間
	leaving_hour =document.alarm.leaving_hour.value;
	leaving_minute= document.alarm.leaving_minute.value;
	leaving_time = "セットした出発時間は"+leaving_hour+"時"+leaving_minute+"分"

	document.getElementById("wakeup_time").innerHTML = wakeup_time;
	document.getElementById("leaving_time").innerHTML = leaving_time;

	//1起床時刻のunix時間, 起床時刻が日を跨ぐとき
	nowTime = new Date(); //  現在日時を得る
	nowYear = nowTime.getFullYear(); // 年を抜き出す
	nowMonth = nowTime.getMonth() + 1; // 月を抜き出す
	nowDate = nowTime.getDate(); //　日を抜き出す
	nowHour = nowTime.getHours(); // 時間を抜き出す
	nowMin  = nowTime.getMinutes(); // 分数を抜き出す
	nowSec  = nowTime.getSeconds(); // 秒数を抜き出す

	//unix
	//現在時刻のunix時間
	nowTime_unix = parseInt( nowTime / 1000 ); //単位：秒

	 wakeupDate = new Date( nowYear, (nowMonth- 1), nowDate + 1 , wakeup_hour , wakeup_minute );
	 wakeupDate_unix = parseInt(wakeupDate / 1000 ); // timestampに変更する

	 let leavingDate = new Date( nowYear, (nowMonth- 1), nowDate + 1 , leaving_hour , leaving_minute );
	 let leaving_unix = parseInt(leavingDate  / 1000 ); // timestampに変更する

	 readyTime =(leaving_unix - wakeupDate_unix)/(60) //準備時間(分）
	 ready = readyTime * 60; //(秒)
	 if (readyTime < 0){
		wakeupDate = new Date( nowYear, (nowMonth- 1), nowDate , wakeup_hour , wakeup_minute );
		wakeupDate_unix = parseInt(wakeupDate / 1000 ); // timestampに変更する
		readyTime =(leaving_unix - wakeupDate_unix)/(60) //準備時間(分）
		ready = readyTime * 60;
	 }

	console.log("readyTime分" + readyTime);
})

function message (){
	nowTime = new Date(); //  現在日時を得る
	nowYear = nowTime.getFullYear(); // 年を抜き出す
	nowMonth = nowTime.getMonth() + 1; // 月を抜き出す
	nowDate = nowTime.getDate(); //　日を抜き出す
	nowHour = nowTime.getHours(); // 時間を抜き出す
	nowMin  = nowTime.getMinutes(); // 分数を抜き出す
	nowSec  = nowTime.getSeconds(); // 秒数を抜き出す
	wakeup_hour =document.alarm.wakeup_hour.value;
	wakeup_minute =document.alarm.wakeup_minute.value;

	wakeupDate = new Date( nowYear, (nowMonth- 1), nowDate , wakeup_hour , wakeup_minute );
	wakeupDate_unix = parseInt(wakeupDate / 1000 ); // timestampに変更する

	//現在時刻のunix時間
	nowTime = new Date(); //  現在日時を得る
	nowTime_unix = parseInt( nowTime / 1000 ); //単位：秒

	console.log("nowTime_unix:" + nowTime_unix);
	console.log("wakeupDate_unix" + wakeupDate_unix);
	console.log("readyTime_out" + ready);

	//起床時刻になったら音とメッセージで伝える。カウントダウンをスタートさせる
	if (wakeupDate_unix == nowTime_unix)
	{
			document.getElementById("msg_wakeup_area").innerHTML = "起床時刻になりました！";
			const music = new Audio('アラーム音1.mp3');
			music.play();
			music.loop = true;

			document.getElementById("pause").innerHTML = "一時停止"
			document.getElementById("pause").onclick = function() {
				music.pause();
			  };

	}

}
	setInterval(message, 1000);

	function countdown(){
		 console.log("ready_out(秒)" + ready);

		//ミリ秒から単位を修正
		let calcHour = Math.floor(ready/ 60 / 60);
		let calcMin = Math.floor(ready/ 60) % 60;
		let calcSec = Math.floor(ready) % 60;

		if (ready < 0){
			calcHour = 0;
			calcMin = 0;
			calcSec =0;
		 }


		//取得した時間を表示（2桁表示）
		document.getElementById("countdown_hour").innerHTML  = calcHour < 10 ? '0' + calcHour : calcHour;
		document.getElementById("countdown_min").innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
		document.getElementById("countdown_sec").innerHTML = calcSec < 10 ? '0' + calcSec : calcSec;
		ready = ready - 1;
		}

		countdown();
		setInterval(countdown,1000);




//現在時刻を取得
function nowTime_function(){
	nowTime = new Date(); //  現在日時を得る
	nowYear = nowTime.getFullYear(); // 年を抜き出す
	nowMonth = nowTime.getMonth() + 1; // 月を抜き出す
	nowDate = nowTime.getDate(); //　日を抜き出す
	nowHour = nowTime.getHours(); // 時間を抜き出す
	nowMin  = nowTime.getMinutes(); // 分数を抜き出す
	nowSec  = nowTime.getSeconds(); // 秒数を抜き出す
	// let msg = "現在時刻：" + nowHour + ":" + nowMin + ":" + nowSec;
	console.log("現在時刻" + nowTime);
	}
//１秒ごとに取得し続ける(意味ある？表示するならいいけど・・・)
setInterval(nowTime_function, 1000);

