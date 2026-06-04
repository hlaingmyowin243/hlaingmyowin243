const guessNumberInput = document.querySelector("#guessNumberInput");
const guessBtn = document.querySelector("#guessBtn");
const restartBtn = document.querySelector("#restartBtn");
const divColor = document.querySelector("#divColor");

const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");
let answer = Math.floor(Math.random() * 50) + 1;
console.log(answer);
let chance = 10;
let guessed = [];
msg2.innerHTML = "Number of chance to guess :" + chance;
const play = () => {
  const guess = Number(guessNumberInput.value);

  if (guess < 1 || guess > 50) {
    alert("Please enter number between 1 to 50");
  } else {
    if (guess > answer) {
      msg1.textContent = "Your number is too high";
      chance--;
      msg2.innerHTML = "Number of chance to guess :" + chance;
      guessed.push(guess);
      msg3.textContent = "Guessed number are :" + guessed;
      divColor.classList.add("false");
    } else if (guess === answer) {
      msg1.textContent = "Congulation you won this game!";
      divColor.classList.add("ture");
      guessBtn.disabled = true;
    } else {
      msg1.textContent = "Your number is too low";
      chance--;
      msg2.innerHTML = "Number of chance to guess :" + chance;
      guessed.push(guess);
      msg3.textContent = "Guessed number are :" + guessed;
      divColor.classList.add("false");
    }
  }
  if (chance === 0) {
    guessBtn.disabled = true;
  }
  guessNumberInput.value = "";
};

guessBtn.addEventListener("click", () => {
  play();
});

const restart = () => {
  answer = Math.floor(Math.random() * 50) + 1;
  divColor.classList.remove("ture");
  divColor.classList.remove("false");
  chance = 10;
  msg2.innerHTML = "Number of chance to guess :" + chance;
  guessed = [];
  msg3.textContent = "Guessed number are :" + guessed;
  msg1.textContent = "successfully restarted";
  guessNumberInput.value = "";
};

restartBtn.addEventListener("click", () => {
  restart();
});
