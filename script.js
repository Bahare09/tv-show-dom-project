//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//create select-box
const selectBox2 = document.createElement("select");
selectBox2.id = "selectBox2";
rootElem.appendChild(selectBox2);
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
//create a div container for all shows
let showsContainer = document.createElement("div");
rootElem.appendChild(showsContainer);
showsContainer.id = "showsContainer";
let allEpisodes = [];

function setup() {
  
  // fetch("https://api.tvmaze.com/shows/82/episodes")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     allEpisodes = data;
  //     makePageForEpisodes(allEpisodes);
  //     searchDisplay.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
  //     makeSelectBox(allEpisodes);
  //   });

  const allShows = getAllShows();

  makeSelectBox2(allShows);
  makePageForShows(allShows);
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
function search(episodeList) {
  searchInput.addEventListener("keyup", (event) => {
    const searchWord = event.target.value.toLowerCase();

    const filterEpisode = episodeList.filter((episode) => {
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
}
// function for create select options
function makeSelectBox(episodeList) {
  //reset the select box
  document.getElementById("selectBox").innerHTML = "";
  let option = document.createElement("option");
  option.innerText = "All Episodes";
  document.getElementById("selectBox").appendChild(option);
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.innerText = episodeTitle(episode);
    document.getElementById("selectBox").appendChild(option);
  });
}
function selectEp(episodeList) {
  selectBox.addEventListener("change", (event) => {
    const selectedEpisode = event.target.value;
    // let allEpisodes = getAllEpisodes();

    if (selectedEpisode === "All Episodes") {
      return makePageForEpisodes(episodeList);
    } else {
      const selectEp = episodeList.filter((episode) => {
        return episodeTitle(episode) === selectedEpisode;
      });
      console.log(selectEp);

      makePageForEpisodes(selectEp);
    }
  });
}

//function for create select options (series)
function makeSelectBox2(AllShows) {
  let option = document.createElement("option");
  option.innerText = "All Shows";
  document.getElementById("selectBox2").appendChild(option);
  AllShows.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }).forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show.name.toUpperCase();
    //get the id for finding API address for each show
    option.value = show.id;
    document.getElementById("selectBox2").appendChild(option);
  });
}

selectBox2.addEventListener("change", (event) => {
  const selectedShow = event.target.value;
  console.log(selectedShow);
  fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      showsContainer.innerHTML=""
      makePageForEpisodes(data);
      makeSelectBox(data);
      search(data);
      searchDisplay.innerText = `Displaying ${data.length} / ${data.length} episodes`;
      selectEp(data);
    });
});

function makePageForShows(showList) {
  //reset the page
  showsContainer.innerHTML = "";

  return showList.forEach((show) => {
    //create a div for card
    let cardDiv2 = document.createElement("div");
    cardDiv2.id = "cardId2";
    showsContainer.appendChild(cardDiv2);

    //create img tag
    let shImage = document.createElement("img");
    shImage.id = "shImageId";
    shImage.src = show.image.medium;
    cardDiv2.appendChild(shImage);

    let nameSummeryDiv = document.createElement("div");
    nameSummeryDiv.id = "nameSummeryDiv";
    cardDiv2.appendChild(nameSummeryDiv);

    //create h3 tag for name
    let showName = document.createElement("h1");
    showName.id = "showName";
    showName.innerText = show.name;
    nameSummeryDiv.appendChild(showName);

    //create tag p for summary
    //let epSummary = document.createElement("p");
    //epSummary.innerText = episode.summary;
    nameSummeryDiv.innerHTML += show.summary;

    //create a div for card
    let cardDivDetail = document.createElement("div");
    cardDivDetail.id = "cardIdDetail";
    cardDiv2.appendChild(cardDivDetail);

    const rated = document.createElement("h3");
    rated.innerHTML = `rated: ${show.rating.average}`;
    cardDivDetail.appendChild(rated);

    const genres = document.createElement("h3");
    genres.innerHTML = `Genres: ${show.genres}`;
    cardDivDetail.appendChild(genres);

    const status = document.createElement("h3");
    status.innerHTML = `Status: ${show.status}`;
    cardDivDetail.appendChild(status);

    const runtime = document.createElement("h3");
    runtime.innerHTML = `Runtime: ${show.runtime}`;
    cardDivDetail.appendChild(runtime);

    shImage.value=show.id

    shImage.addEventListener("click", (event) => {
      const selectedShow = event.target.value;
      console.log(selectedShow);
      fetch(`https://api.tvmaze.com/shows/${selectedShow}/episodes`)
        .then((response) => response.json())
        .then((data) => {
          showsContainer.innerHTML=""
          makePageForEpisodes(data);
          makeSelectBox(data);
          search(data);
          searchDisplay.innerText = `Displaying ${data.length} / ${data.length} episodes`;
          selectEp(data);
        });
    });
    
  });
}



window.onload = setup;
