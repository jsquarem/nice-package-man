import { setSearchFocus } from './seachInput.js';
import {
  deleteSearchResults,
  clearStatsLine,
  setStatsLine,
  buildSearchResults,
} from './searchResults.js';
import { getSearchTerm, retrieveSearchResults } from './datafunctions.js';

const button = document.getElementById('searchPackagesButton');
button.addEventListener('click', (event) => {
  submitTheSearch(event);
});

const input = document.getElementById('searchPackagesInput');
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    submitTheSearch(event);
  }
});

const submitTheSearch = (event) => {
  event.preventDefault();
  //deleteSearchResults();
  processTheSearch();
};

const processTheSearch = async () => {
  //clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
