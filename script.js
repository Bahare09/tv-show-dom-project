//You can edit ALL of the code here
const rootElem = document.getElementById("root");
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

//function will call when user start typing in a search box
searchInput.addEventListener("keyup", (event) => {
  const searchWord = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filterEpisode = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchWord) ||
      episode.summary.toLowerCase().includes(searchWord)
  );
  //call the function to make a new page for filter episodes
  makePageForEpisodes(filterEpisode);
  //display the search result
  searchDisplay.innerText = `Displaying ${filterEpisode.length} / ${allEpisodes.length} episodes`;
});

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchDisplay.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
}

function makePageForEpisodes(episodeList) {
  //reset the page
  cardsContainer.innerHTML = "";
  
  return episodeList.forEach((episode) => {
    let episodeCode = `S0${episode.season}E0${episode.number}`;
    //create a div for card
    let cardDiv = document.createElement("div");
    cardDiv.id = "cardId";
    cardsContainer.appendChild(cardDiv);
    //create img tag
    let epImage = document.createElement("img");
    epImage.id = "epImageId";
    epImage.src = episode.image.medium;
    cardDiv.appendChild(epImage);
    //create h3 tag for name and number
    let epName = document.createElement("h3");
    epName.textContent = `${episode.name} - ${episodeCode}`;
    cardDiv.appendChild(epName);
    //create tag p for summary
    let epSummary = document.createElement("p");
    epSummary.innerHTML = episode.summary;
    cardDiv.appendChild(epSummary);
  });
}

window.onload = setup;
