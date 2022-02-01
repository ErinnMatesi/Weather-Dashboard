var today = moment().format('L');
var apiKey = "0111ecb58971fc33b9ef27ef46d9d788";
var searchButton = document.querySelector(".searchButton");
var searchInput = document.querySelector(".searchInput");
var searchHistory = document.querySelector("#searchHistory");
var forecast = document.querySelector("#forecast");
var dayTemp = document.querySelector("#dayTemp");
var dayWind = document.querySelector("#dayWind");
var dayHumid = document.querySelector("#dayHumid");
var dayUV = document.querySelector("#dayUV");

var displayResults = function(data) {
    forecast.textContent = city + today;
    // need to add weather icon to this too ^
    dayTemp.textContent = "Temp:" + data.current.temp;
    dayWind.textContent = "Wind:" + data.current.wind_speed;
    dayHumid.textContent = "Humidity:" + data.current.humidity;
    dayUV.textContent = "UV:" + data.current.uvi;
    console.log("it's ALIIIIVVVEEEE")
};

// variable.textContent = "Temp: " + data.current.temp
var fiveDay;

var getLongLat = function(city) {
    var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=0111ecb58971fc33b9ef27ef46d9d788";

    fetch(geoAPI)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getWeather(data[0].lat, data[0].lon);

        // check local storage and add new city to list
        var oldHistory = JSON.parse(localStorage.getItem("history")) || [];
        if (!oldHistory.includes(data[0].name)) {
        oldHistory.push(data[0].name)
        localStorage.setItem("history", JSON.stringify(oldHistory));
        }
    })
    .catch(function (error) {
        alert("Unable to find that lat/lon");
    });
};

// fetches weather info in imperial units
var getWeather = function(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=0111ecb58971fc33b9ef27ef46d9d788";

    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // add weather card details here
        // creating daily forecast
        displayResults(data);
        // new Date(data.current.dt*1000).toLocaleDateString()
        // console.log(Date);
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
};

// new Date(data.current.dt*1000).toLocaleDateString()


var printHistory = function(city) {
    var historyItem = document.createElement("li");
    historyItem.innerText=city;
    historyItem.addEventListener("click", function(event) {
        var city = event.target.innerText;
        getLongLat(city);
    });
    searchHistory.appendChild(historyItem);
};

var getFromStorage = function() {
    var history = JSON.parse(localStorage.getItem("history")) || [];
    for (var i = 0; i < history.length; i++) {
        printHistory(history[i]);
    }
};

getFromStorage();

searchButton.addEventListener("click", function() {
    var getCity = searchInput.value.trim();
    getLongLat(getCity);
    printHistory(getCity);
});
