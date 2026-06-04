const moon = document.querySelector("#moon");
const body = document.querySelector("body");
const mode = document.querySelector("#mode");

const darkmode = () => {
  if (body.classList.contains("darkmode")) {
    body.classList.remove("darkmode");
    mode.src = "./asset/moon.png";
  } else {
    body.classList.add("darkmode");

    mode.src = "./asset/brightness.png";
  }
};

moon.addEventListener("click", () => {
  darkmode();
});
