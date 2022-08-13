export const getSearchTerm = () => {
  const rawSearchTerm = document
    .getElementById('searchPackagesInput')
    .value.trim();
  //let rawSearchTerm = 'cross spawn';
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, '');
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const npmSearchString = `https://api.npms.io/v2/search?q=${searchTerm}`;
  //console.log(npmSearchString, '<-npmSearchString');
  const npmSearchResults = await requestData(npmSearchString);
  let resultArray = [];
  if (npmSearchResults.hasOwnProperty('results')) {
    resultArray = processNPMResults(npmSearchResults.results);
  }
  return resultArray;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processNPMResults = (results) => {
  const resultArray = [];
  results.forEach((result) => {
    const name = result.package.name;
    const version = result.package.version;
    const date = result.package.date;
    const score = result.searchScore;
    const url = result.package.links.npm;
    const item = {
      name: name,
      version: version,
      date: date,
      score: score,
      url: url,
    };
    resultArray.push(item);
  });
  //console.log(resultArray, '<-resultArray');
  return resultArray;
};
