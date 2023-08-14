const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".flag-img");
const countryTitle = document.querySelector("h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".languages");
const borderCountryElement = document.querySelector(".border-country");
const themeChanger = document.querySelector(".ui-theme");
const themeMessage = document.querySelector('.message')


let theme = window.localStorage.getItem("data-theme");
if (theme) document.body.classList.add(theme);
themeChanger.checked = theme == "dark" ? true : false;

themeChanger.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    window.localStorage.setItem("data-theme", "dark");
    themeMessage.style.opacity = '1'
    themeMessage.innerText = 'Dark mode Enabled'
    setTimeout(()=>{
      themeMessage.style.opacity = '0'
    },3000)
  } else {
    document.body.classList.remove("dark");
    window.localStorage.removeItem("data-theme")
    themeMessage.style.opacity = '1'
    themeMessage.innerText = 'Dark mode Disabled'
    setTimeout(()=>{
      themeMessage.style.opacity = '0'
    },3000)
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

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    document.title = country.name.common
    flagImg.src = country.flags.svg;
    countryTitle.innerText = country.name.common;
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital;
    }
    topLevelDomain.innerText = country.tld.join(", ");
    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountryElement.append(borderCountryTag);
          });
      });
    }
  });


