const countriesContainer = document.querySelector(".countries-container");
const filterRegion = document.querySelector(".sort-bar");
const searchInput = document.querySelector(".search-bar input");
const themeChanger = document.querySelector(".ui-theme");
let allCountriesData;

let theme = window.localStorage.getItem("data-theme");
if (theme) document.body.classList.add(theme);
themeChanger.checked = theme == "dark" ? true : false;
themeChanger.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    window.localStorage.setItem("data-theme", "dark");
  } else {
    document.body.classList.remove("dark");
    window.localStorage.removeItem("data-theme");
  }
});

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".dot-spinner").style.visibility = "visible";
  } else {
    document.querySelector(".dot-spinner").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <div class="card-text">
            <h3>${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
        </div>
    `;
    countriesContainer.append(countryCard);
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterRegion.addEventListener("change", (e) => {
  console.log(filterRegion.value);
  fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value)
  );
  renderCountries(filteredCountries);
});
