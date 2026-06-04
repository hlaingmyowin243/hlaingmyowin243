const passwordBox = document.querySelector("#passwordBox");
const copyImg = document.querySelector("#copyImg");
const GenerateBtn = document.querySelector("#GenerateBtn");
const container = document.querySelector("#container");

const passGenerate = (val) => {
  let password = "";
  const word =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  for (let i = 0; i < val; i++) {
    let random = Math.floor(Math.random() * word.length);
    password += word[random];
  }
  passwordBox.value = password;
};

GenerateBtn.addEventListener("click", () => {
  passGenerate(7);
});

const copyFn = () => {
  if (passwordBox.value === "") {
    container.classList.toggle("container");
  } else {
    navigator.clipboard.writeText(passwordBox.value).then(() => {
      copyImg.src = "./asset/check-button.png";

      setTimeout(() => {
        copyImg.src = "./asset/copy.png";
      }, 1000);
    });
  }
};

copyImg.addEventListener("click", () => {
  copyFn();
});
