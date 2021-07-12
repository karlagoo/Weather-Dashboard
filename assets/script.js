var cityName;
var apiKey = "91b227cfb38384f6cbe87310fda24986";

function getCurrentWeather() {
    cityName = $("#searchBar").val();
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        forecast(lat, lon);
    });
};

function forecast(lat, lon){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
    })
};

$("#searchBtn").on("click", function () {
    getCurrentWeather();
})