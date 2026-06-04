const dropArea = document.querySelector("#drop-area");
const inputFile = document.querySelector("#input-file");
const imageView = document.querySelector("#imageView");
const imgContainer = document.querySelector("#imgContainer");

const uploadImage = () => {
  let imageLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imageLink})`;
  imageView.innerHTML = "";
  imgContainer.style.border = 0;
};

inputFile.addEventListener("change", () => {
  uploadImage();
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
