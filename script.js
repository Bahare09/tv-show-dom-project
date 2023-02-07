//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//create select-box
const selectBox = document.createElement("select");
selectBox.id = "selectBox";
rootElem.appendChild(selectBox);
//create input box for search
let searchInput = document.createElement("input");
searchInput.id = "searchInputId";
searchInput.placeholder = "Search..";
rootElem.appendChild(searchInput);
//create a span for display the search result
let searchDisplay = document.createElement("span");
searchDisplay.id = "searchDisplayId";
rootElem.appendChild(searchDisplay);
//create a div container for all cards
let cardsContainer = document.createElement("div");
rootElem.appendChild(cardsContainer);
cardsContainer.id = "cardsContainer";

function setup() {
  const allEpisodes = getAllEpisodes();
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data));

  // makePageForEpisodes(allEpisodes);
  searchDisplay.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
  makeSelectBox(allEpisodes);
}

//create episodeTitle
function episodeTitle(episode) {
  return `${episode.name} - S${episode.season
    .toString()
    .padStart(2, 0)}E${episode.number.toString().padStart(2, 0)}`;
}

function makePageForEpisodes(episodeList) {
  //reset the page
  cardsContainer.innerHTML = "";

  return episodeList.forEach((episode) => {
    //create a div for card
    let cardDiv = document.createElement("div");
    cardDiv.id = "cardId";
    cardsContainer.appendChild(cardDiv);
    //create h3 tag for name and number
    let epTitle = document.createElement("h3");
    epTitle.id = "epTitle";
    epTitle.innerText = episodeTitle(episode);
    cardDiv.appendChild(epTitle);

    //create img tag
    let epImage = document.createElement("img");
    epImage.id = "epImageId";
    epImage.src = episode.image.medium;
    cardDiv.appendChild(epImage);
    //create tag p for summary
    //let epSummary = document.createElement("p");
    //epSummary.innerText = episode.summary;
    cardDiv.innerHTML += episode.summary;
  });
}

//function will call when user start typing in a search box
searchInput.addEventListener("keyup", (event) => {
  const searchWord = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filterEpisode = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchWord) ||
      episode.summary.toLowerCase().includes(searchWord)
    );
  });
  //call the function to make a new page for filter episodes
  makePageForEpisodes(filterEpisode);
  //display the search result
  searchDisplay.innerText = `Displaying ${filterEpisode.length} / ${allEpisodes.length} episodes`;
});
// function for create select options
function makeSelectBox(episodeList) {
  let option = document.createElement("option");
  option.innerText = "All Episodes";
  document.getElementById("selectBox").appendChild(option);
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.innerText = episodeTitle(episode);
    document.getElementById("selectBox").appendChild(option);
  });
}
selectBox.addEventListener("change", (event) => {
  const selectedEpisode = event.target.value;
  let allEpisodes = getAllEpisodes();

  if (selectedEpisode === "All Episodes") {
    return makePageForEpisodes(allEpisodes);
  } else {
    const selectEp = allEpisodes.filter((episode) => {
      return episodeTitle(episode) === selectedEpisode;
    });
    console.log(selectEp);

    makePageForEpisodes(selectEp);
  }
});

window.onload = setup;
