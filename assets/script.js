var today = moment().format('L');
var apiKey = "0111ecb58971fc33b9ef27ef46d9d788";
var searchButton = document.querySelector(".searchButton");
var searchInput = document.querySelector(".searchInput");
var searchHistory = document.getElementById("#searchHistory");

var getWeather;
var getLongLat;
var displayResults;
var printHistory;

getLongLat = function(city) {
    var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=0111ecb58971fc33b9ef27ef46d9d788";

    fetch(geoAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
}

// fetches weather info in imperial units
getWeather = function(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=0111ecb58971fc33b9ef27ef46d9d788";

    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
};

searchButton.addEventListener("click", function() {
    // pulls value from the input
    var getCity = searchInput.value.trim();

    getLongLat(getCity);
    getWeather();
    displayResults();
    printHistory();
});
