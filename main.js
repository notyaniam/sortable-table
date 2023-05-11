import data from "./data.json" assert { type: "json" };

// getting DOM elements
const tableContentElement = document.getElementById("table-content");
const headerBtnElements = document.querySelectorAll("th button");

// loading data to be used
const users = data.users.map((item) => {
  const { id, firstName, lastName, age, gender, email, phone, username } = item;
  return {
    userId: id,
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    username,
  };
});

// creating a copy of the data to avoid mutation for original
const usersCopy = [...users];

/**
 * function to create a row from an array object provided
 * @param {Object} tableItem - each object from an array
 * @returns
 */
function createRow(tableItem) {
  // creating a new table row element
  const rowElement = document.createElement("tr");
  // getting the item keys(header) from each table row received into an array
  const itemKeys = Object.keys(tableItem);
  // mapping through the item keys array
  itemKeys.map((key) => {
    // creating a new cell (tr > td)
    const cellElement = document.createElement("td");
    // adding a cell attribute based on the item key
    cellElement.setAttribute("data-title", key);
    // adding the cell content for the row
    cellElement.innerText = tableItem[key];
    // adding the cell into the row element
    rowElement.appendChild(cellElement);
  });
  return rowElement;
}

// function to add array content into a table
function updateTableBody(data) {
  const tableBodyFragment = document.createDocumentFragment();
  data.map((item) => {
    // creating a row with attributes
    const row = createRow(item);
    // appending each row to the table body
    tableBodyFragment.appendChild(row);
  });
  tableContentElement.append(tableBodyFragment);
}

// function to sort data based on criteria
function sortDataFn(data, param, direction = "asc") {
  let sortedData;

  if (data && data.length) {
    tableContentElement.innerHTML = "";

    // sorting data
    if (!direction || direction === "asc") {
      sortedData = data.sort((a, b) => {
        if (a[param] < b[param]) return -1;
        if (a[param] > b[param]) return 1;
        return 0;
      });
    } else {
      sortedData = data.sort((a, b) => {
        if (b[param] < a[param]) return -1;
        if (b[param] > a[param]) return 1;
        return 0;
      });
    }
  }
  updateTableBody(sortedData);
}

// function to reset buttons that were not click target
function resetButtons(e) {
  [...headerBtnElements].map((button) => {
    if (button !== e.target) {
      button.removeAttribute("data-dir");
    }
  });
}

// listener to load table once DOM is finished starting
window.addEventListener("load", () => {
  // updating the table with default data
  updateTableBody(users);

  // listeners for button click
  [...headerBtnElements].map((button) => {
    // adding click listener for each button
    button.addEventListener("click", (e) => {
      // resetting buttons with data attributes
      resetButtons(e);

      // checking if the target already has an attribute
      if (e.target.getAttribute("data-dir") === "desc") {
        // sorting data via descending
        sortDataFn(usersCopy, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        // handling if not attribute or attribute is ascending
        sortDataFn(usersCopy, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });
});
