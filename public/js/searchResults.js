export const deleteSearchResults = () => {
  const searchTable = document.getElementById('searchResultsTable');
  console.log(searchTable, '<-searchTable');
  if (searchTable) searchTable.remove();
};

export const clearStatsLine = () => {
  const statsLine = document.getElementById('stats');
  statsLine.textContent = '';
};

export const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById('stats');
  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statLine.textContent = 'Sorry, no results.';
  }
};

// Add rows to the table
export const buildSearchResults = (resultArray) => {
  const searchResultsTable = createSearchResultsTable();
  const tableBody = searchResultsTable.getElementsByTagName('tbody')[0];
  resultArray.forEach((result) => {
    tableBody.appendChild(createResultRow(result));
  });
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.appendChild(searchResultsTable);
};

// Build the table
const createSearchResultsTable = () => {
  const searchResultsTable = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const classArray = [
    'table',
    'table-dark',
    'table-hover',
    'search-results-table',
    'h-75',
    'align-self-center',
    'rounded',
    'border',
    'border-secondary',
  ];
  searchResultsTable.id = 'searchResultsTable';
  searchResultsTable.classList.add(...classArray);
  searchResultsTable.appendChild(tableBody);
  return searchResultsTable;
};

// Build the row
const createResultRow = (result) => {
  const resultRow = document.createElement('tr');
  resultRow.classList.add('resultName');
  resultRow.appendChild(createResultButtonCell(result));
  resultRow.appendChild(createPackageCell(result, result.score));
  resultRow.appendChild(createPackageCell(result));
  resultRow.appendChild(createPackageCell(result, '->'));
  return resultRow;
};

// Build Package link cells
const createPackageCell = (result, linkText = '') => {
  const packageCell = document.createElement('td');
  packageCell.classList.add('p-0');
  packageCell.appendChild(createPackageLink(result, linkText));
  return packageCell;
};

const createPackageLink = (result, linkText = '') => {
  if (linkText === '') linkText = result.name;
  const packageLink = document.createElement('a');
  const classArray = [
    'd-flex',
    'text-decoration-none',
    'h-100',
    'align-items-center',
    'text-white',
  ];
  packageLink.href = result.url;
  packageLink.target = '_blank';
  packageLink.classList.add(...classArray);
  packageLink.textContent = linkText;
  return packageLink;
};

// Build package button
const createResultButtonCell = (result) => {
  const resultCell = document.createElement('td');
  const resultForm = document.createElement('form');
  resultForm.action = `${window.location.pathname}/packages`;
  resultForm.method = 'POST';
  Object.keys(result).forEach((key) => {
    resultForm.appendChild(createInputElement(result, key));
  });
  resultForm.appendChild(createButtonElement());
  resultCell.appendChild(resultForm);
  return resultCell;
};

const createInputElement = (result, key) => {
  const inputElement = document.createElement('input');
  inputElement.type = 'hidden';
  inputElement.name = key;
  inputElement.value = result[key];
  return inputElement;
};

const createButtonElement = () => {
  const buttonElement = document.createElement('button');
  buttonElement.type = 'submit';
  buttonElement.classList.add('btn');
  buttonElement.classList.add('btn-secondary');
  buttonElement.textContent = 'Add';
  return buttonElement;
};
