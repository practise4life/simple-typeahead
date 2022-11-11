let countries = [];

const countryListElement = document.querySelector("#country-list");
const countryInputElement = document.querySelector("#country-input");

// Once you create this function call this
function fetchCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      countries = data.map((x) => x.name.common);
      console.log(countries);
      countries.sort();
      loadData(countries, countryListElement);
    });
}

//function to load the countries

function loadData(data, element) {
  if (data) {
    element.innerHTML = "";
    let innerElement = "";
    data.forEach((item) => {
      innerElement += `
                <li>${item}</li>
            `;
    });

    element.innerHTML = innerElement;
  }
}

//needs to be called once the user input's something
function filterData(data, searchText) {
  return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}

fetchCountries();

// countryInputElement.addEventListener("input", function () {
//   const filteredData = filterData(countries, countryInputElement.value);
//   loadData(filteredData, countryListElement);
// });

countryInputElement.addEventListener("input", () => handleUserInput());

function handleUserInput() {
  const filteredData = filterData(countries, countryInputElement.value);
  loadData(filteredData, countryListElement);
}
