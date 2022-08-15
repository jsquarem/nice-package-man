export const deleteSearchResults = () => {
  const searchTable = document.getElementById('searchResultsTable');
  if (searchTable) searchTable.remove();
};

export const clearStatsLine = () => {
  const statsLine = document.getElementById('stats');
  statsLine.textContent = '';
};

export const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById('stats');
  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results. Click Name to visit NPM page.`;
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
    'w-100',
  ];
  searchResultsTable.id = 'searchResultsTable';
  searchResultsTable.classList.add(...classArray);
  searchResultsTable.appendChild(createTableHead());
  searchResultsTable.appendChild(tableBody);
  return searchResultsTable;
};

const createTableHead = () => {
  const tableHeadStrings = [
    'Add to Collection',
    'Search Score',
    'Package Name',
    '',
  ];
  const tableHead = document.createElement('thead');
  const tableRow = document.createElement('tr');
  tableHeadStrings.forEach((string) => {
    const tableCell = document.createElement('th');
    tableCell.textContent = string;
    tableRow.appendChild(tableCell);
  });
  tableHead.appendChild(tableRow);
  return tableHead;
};

// Build the row
const createResultRow = (result) => {
  const resultRow = document.createElement('tr');
  resultRow.classList.add('resultName');
  const linkData = {
    button: {
      result: result,
      linkText: '',
      classList: [],
    },
    score: {
      result: result,
      linkText: result.score,
      classList: [],
    },
    packageName: {
      result: result,
      linkText: result.name,
      classList: ['text-wrap', 'text-info'],
    },
    outArrow: {
      result: result,
      linkText: '&nbsp;&nbsp<i class="bi bi-arrow-right"></i>',
      classList: ['text-nowrap', 'text-info', 'p-1'],
    },
  };
  if (result.score >= 90) {
    linkData.score.classList = ['text-success'];
  } else if (result.score >= 25 && result.score < 90) {
    linkData.score.classList = ['text-warning'];
  } else {
    linkData.score.classList = ['text-danger'];
  }
  resultRow.appendChild(createResultButtonCell(linkData.button.result));
  resultRow.appendChild(createPackageCell(linkData.score));
  resultRow.appendChild(
    createPackageCell(linkData.packageName, result.description)
  );
  resultRow.appendChild(createPackageCell(linkData.outArrow));
  return resultRow;
};

// Build Package link cells
const createPackageCell = (linkData, text = '') => {
  const packageCell = document.createElement('td');
  packageCell.classList.add('p-0');
  packageCell.appendChild(createPackageLink(linkData));
  if (!text) return packageCell;
  const additionalText = document.createElement('p');
  additionalText.innerHTML = text;
  packageCell.appendChild(additionalText);
  return packageCell;
};

const createPackageLink = ({ result, linkText, classList }) => {
  const packageLink = document.createElement('a');
  const classArray = [
    'd-flex',
    'text-decoration-none',
    'h-100',
    'align-items-center',
    'pr-2',
  ];
  classArray.push(...classList);
  packageLink.href = result.url;
  packageLink.target = '_blank';
  packageLink.classList.add(...classArray);
  packageLink.innerHTML = linkText;
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
