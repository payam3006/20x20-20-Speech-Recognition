const q = console.log;

if ("webkitSpeechRecognition" in window) {
  q("OK! Speech Recognition is Available");
} else {
  q("Speech Recognition NOT Available");
}

///Do NOT Work!!!??? VVV
//var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
//var recognition = new SpeechRecognition();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

//continuous : آیا در صورتی که موردی پیدا شد همچنان صوت را دریافت کند یا متوقف شود
// lang : صوت که دریافت می کند به چه زبانی است برای ایرانی fa-IR
// interimResults : اینکه نتیجه را مستقیما برگرداند یا کمی بیشتر پردازش کرده و نتیجه نهایی را نمایش دهد
// maxAlternatives : موارد مرتبط را هم نمایش دهد یا فقط یک نتیجه باشد

// recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = true;
// recognition.maxAlternatives = 1;

//دستورات شروع و توقف ضبط صدا
// recognition.start();
// recognition.stop();

//زمانی که نتیجه یافت گردید
// recognition.onresult = function(event) {
//     var result = event.results[0][0].transcript;
//   }

//  زمانی که دریافت صدا به پایان رسید
// recognition.onspeechend = function(event) {}

//زمانی که هیچ موردی یافت نشد
// recognition.onnomatch = function(event) {}

//زمانی که خطایی هنگام دریافت صدا رخ داده
// recognition.onerror= function(event) {}

const answerEle = document.getElementById("answer");
const saidNumber = document.getElementById("saidNumber");
const guide = document.getElementById("guide");
const finalPage = document.getElementById("final");
const main = document.getElementsByTagName("main")[0];
const answer = Math.ceil(Math.random() * 100);
q(answer);
answerEle.innerText = answer;

function reload() {
  location.reload();
}

let guessAnswer = 0;

recognition.addEventListener("result", (e) => {
  if (e.results[0][0].transcript >= 1 && e.results[0][0].transcript <= 100) {
    document.getElementById("action").setAttribute("style", "");
    saidNumber.innerHTML = e.results[0][0].transcript;
    if (e.results[0][0].transcript == answer) {
      finalPage.classList.remove("hidden");
      main.classList.add("hidden");
      guessAnswer = e.results[0][0].transcript;
    } else if (e.results[0][0].transcript > answer) {
      guide.innerText = "GO LOWER";
    } else {
      guide.innerText = "GO HIGHER";
    }
  } else {
    if (e.results[0].isFinal) {
      saidNumber.innerHTML = e.results[0][0].transcript;
      if (e.results[0][0].transcript > 100 || e.results[0][0].transcript < 0) {
        guide.innerText = "Number must be between 1 and 100";
      } else {
        guide.innerText = "This is NOT a valid number!";
      }
    }
  }
  q(e.results[0].isFinal);
  q(e.results[0][0]);
  q(e.results[0][0].transcript);
});

recognition.start();
// recognition.end(); نداریم این فانکشن رو! گو نخور

// q(recognition);

// recognition.onstart = () => {
//   recognition.start();
// };

recognition.onend = () => {
  if (guessAnswer != answer) {
    recognition.start();
  }
};

// recognition.onresult = (event) => {
//   q(event);
// };
