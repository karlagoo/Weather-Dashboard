var cityName;
var previousSearchesArray = [];
var apiKey = "91b227cfb38384f6cbe87310fda24986";
var currentWeather = document.getElementById("current-weather")
var previousCities = document.getElementById("previous-search")
var previousSearch = localStorage.getItem('City')

function renderSearchHistory() {
  console.log("check local storage");
  for (let i = 0; i < previousSearchesArray.length; i++) {
    var previousCity = document.createElement("button");
    previousCity.textContent = previousSearchesArray[i];
    previousCity.addEventListener("click", function () {
      getCurrentWeather(previousSearchesArray[i])
    });
    previousCities.append(previousCity);
  }
};

function updateHistory(city) {
  if (previousSearchesArray.indexOf(city) != -1) {
    return
  }
  previousSearchesArray.push(city);
  localStorage.setItem('Previous Searches', JSON.stringify(previousSearchesArray));
  renderSearchHistory();
}
function getSearchHistory() {
  var previousSearches = localStorage.getItem('Previous Searches');
  if (previousSearches) {
    previousSearchesArray = JSON.parse(previousSearches)
  }
  renderSearchHistory();
};

function getCurrentWeather(city) {
  cityName = $("#searchBar").val() ? $("#searchBar").val() : city;
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      updateHistory(cityName);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      currentWeather.innerHTML = ""
      forecast(lat, lon);
      var nameOfCity = data.name;

      var iconURL = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      var icon = document.createElement('img');
      var currentConditions = document.createElement("p");
      var city = document.createElement('p');
      city.textContent = nameOfCity
      currentWeather.appendChild(city)
      currentConditions.textContent = data.weather[0].description
      currentWeather.appendChild(currentConditions)
      icon.setAttribute('src', iconURL);
      currentWeather.appendChild(icon);
    }).catch(function (err) {
      console.log("oh no");
      console.log(err);
    });
};

function forecast(lat, lon) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var currentTemp = data.current.temp;
      var temp = document.createElement('p');
      console.log(currentTemp)
      temp.textContent = currentTemp
      currentWeather.appendChild(temp)

    })
};

$("#searchBtn").on("click", function () {
  getCurrentWeather();
})

getSearchHistory();
