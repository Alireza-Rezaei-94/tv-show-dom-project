// Api : https://api.tvmaze.com/shows/5/episodes

// get episodes
function episodes() {
  fetch("https://api.tvmaze.com/shows/5/episodes")
    .then((response) => response.json())
    .then((response) => {
      call(response);
    })
    .catch((err) => console.log(err));
}

// Selecting HTML Elemts
let content = document.querySelector(".content");
let search = document.querySelector(".search-input");
const searchCount = document.querySelector(".search-result");
const selectEpisode = document.querySelector(".select-episode");
const defultEpisode = document.createElement("option");

//Defult Episodes
defultEpisode.innerText = "All Episodes";
selectEpisode.append(defultEpisode);

// showing Episodes card on page
function call(response) {
  response.map((element) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // create Element content
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const number = document.createElement("h4");
    const episodeSummery = document.createElement("span");
    const link = document.createElement("a");
    // end of Element content

    //Select options
    let option = document.createElement("option");
    selectEpisode.append(option);

    //remove tag P from first and last
    let removep = element.summary;
    removep = removep.replaceAll("<p>", " ");
    removep = removep.replaceAll("</p>", " ");
    episodeSummery.innerText = removep;

    // start content Element
    image.src = element.image.medium;
    name.innerText = element.name;
    link.href = element.url;

    // chek Episode and season with S00E00 Format
    if (element.number <= 9) {
      number.innerText = `S0${element.season}E0${element.number}`;
      option.innerText = `S0${element.season}E0${element.number}-${element.name}`;
    } else {
      number.innerText = `S0${element.season}E${element.number}`;
      option.innerText = `S0${element.season}E${element.number}-${element.name}`;
    }

    //append
    link.append(name);
    content.append(card);
    card.append(image, link, number, episodeSummery);
  });
}

//search
search.addEventListener("input", (event) => {
  let searchValue = event.target.value.toLowerCase();
  let count = 0;
  const allEpisodes = document.getElementsByClassName("card");
  for (let i = 0; i < allEpisodes.length; i++) {
    if (allEpisodes[i].innerText.toLowerCase().includes(searchValue)) {
      allEpisodes[i].classList.remove("is-hidden");
      count++;
    } else {
      allEpisodes[i].classList.add("is-hidden");
    }
    searchCount.innerText =
      count > 1 ? `${count} episodes found!` : `${count} episode found!`;
  }
});

//select
selectEpisode.addEventListener("click", (event) => {
  let searchValue = event.target.value.toLowerCase().slice(7);
  const allEpisodes = document.getElementsByClassName("card");

  if (searchValue == "sodes") {
    searchValue = "";
  }
  for (let i = 0; i < allEpisodes.length; i++) {
    if (allEpisodes[i].innerText.toLowerCase().includes(searchValue)) {
      allEpisodes[i].classList.remove("is-hidden");
    } else {
      allEpisodes[i].classList.add("is-hidden");
    }
  }
});

//call Episodes function
episodes();
