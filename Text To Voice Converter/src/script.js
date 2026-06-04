let speech = new SpeechSynthesisUtterance();
const ListenBtn = document.querySelector("#ListenBtn");

const speechFunction = () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
};

ListenBtn.addEventListener("click", () => {
  speechFunction();
});
