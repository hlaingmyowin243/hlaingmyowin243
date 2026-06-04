const scriptURL =
  "https://script.google.com/macros/s/AKfycbw2bLs1QOQDbAh9LFwzm8YJu_1lC4x98-GUtfesxR9fXx__AkXmpsY9KGzuOx_JrDgj/exec";
const form = document.forms["submit-to-google-sheet"];

const msg = document.querySelector("#msg");
msg.classList.add("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thanks you for subscribtion";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 3000);
      form.reset();
    })
    .catch((error) => {
      msg.innerHTML = "subscribtion Error";
    });
  setTimeout(() => {
    msg.innerHTML = "";
  }, 3000);
  form.reset();
});
