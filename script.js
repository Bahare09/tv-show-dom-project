//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  //const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  return episodeList.map((episode) => {
    let SENumber = `S0${episode.season}E0${episode.number}`;
    //create a div for card
    let cardDiv = document.createElement("div");
    cardDiv.id = "cardId";
    const rootElem = document.getElementById("root");
    rootElem.appendChild(cardDiv);
    //create tag img
    let image = document.createElement("img");
    image.id = "imageId";
    image.src = episode.image.medium;
    cardDiv.appendChild(image);
    //create tag h3 for name and number
    let cardName = document.createElement("h3");
    cardName.textContent = `${episode.name} - ${SENumber}`;
    cardDiv.appendChild(cardName);
    //create tag p for summary
    let cardSummary = document.createElement("p");
    cardSummary.textContent = episode.summary;
    cardDiv.appendChild(cardSummary);
  });
}

window.onload = setup;
