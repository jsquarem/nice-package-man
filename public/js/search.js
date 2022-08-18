import { setSearchFocus } from "./seachInput.js";
import {
  deleteSearchResults,
  clearStatsLine,
  setStatsLine,
  buildSearchResults,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

const button = document.getElementById("searchPackagesButton");
button.addEventListener("click", (event) => {
  submitTheSearch(event);
});

const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
