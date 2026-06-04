const accessKey = "EZapaogd7bSx489EICdvKZLLkJQJTTMfXtu1ohtIh-w";

const searchbox = document.querySelector("#searchbox");
const searchBtn = document.querySelector("#search-btn");
const searchresult = document.querySelector("#searchresult");
const showmorebtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1;
const search = async () => {
  keyword = searchbox.value;
  const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(URL);
  const data = await response.json();
  if (page === 1) {
    searchresult.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchresult.appendChild(imageLink);
  });
  showmorebtn.style.display = "flex";
};

searchBtn.addEventListener("click", () => {
  search();
});

searchbox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

showmorebtn.addEventListener("click", () => {
  page++;
  search();
});
