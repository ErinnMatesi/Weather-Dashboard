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
var dailyIcon = document.querySelector(".dailyIcon");
var timeOffset;

var displayResults = function(data) {
    //  add weather icon to this too 
    var weatherIcon = data.current.weather[0].icon;
    dailyIcon.setAttribute("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
    // fill in weather details
    dayTemp.textContent = "Temp: " + data.current.temp;
    dayWind.textContent = "Wind: " + data.current.wind_speed;
    dayHumid.textContent = "Humidity: " + data.current.humidity;
    dayUV.textContent = "UV: " + data.current.uvi;
    // set UV color
    var checkUV = function() {
        if (data.current.uvi <= 2 ) {
            dayUV.classList.add("noRisk");
        } else if (data.current.uvi <= 5) {
            dayUV.classList.add("lowRisk");
        } else if (data.current.uvi <= 7) {
            dayUV.classList.add("moderateRisk");
        } else if (data.current.uvi <= 10) {
            dayUV.classList.add("highRisk");
        } else {
            dayUV.classList.add("vHighRisk");
        }
        console.log("checkUV works")
    };
    checkUV();
    console.log("displayResults Works");
};

var getLongLat = function(city) {
    var geoAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=0111ecb58971fc33b9ef27ef46d9d788";

    fetch(geoAPI)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getWeather(data[0].lat, data[0].lon);
        forecast.textContent = city + " " + today;
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
        
        // creating daily forecast
        displayResults(data);
        // add weather card details here
        for (var i = 1; i < 6; i++) {
            var findCard = ".day" + i;
            var parentElement = document.querySelector(findCard);
            var ulChild = parentElement.querySelector(".Stats");
            var h5Child = parentElement.querySelector(".card-body");
            var temp = ulChild.querySelector(".Temp");
            var wind = ulChild.querySelector(".Wind");
            var humid = ulChild.querySelector(".Humid");
            var date = h5Child.querySelector(".Date");
            var icon = h5Child.querySelector(".cardImg");
            timeOffset = data.timezone_offset;
            temp.textContent = "Temp: " + data.daily[i].temp.day;
            humid.textContent = "Humidity: " + data.daily[i].humidity;
            wind.textContent = "Wind: " + data.daily[1].wind_speed;
            date.textContent = new Date((data.current.dt + timeOffset)*1000).toLocaleDateString();
            var weatherIcon = data.daily[i].weather[0].icon;
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
        };
 
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
};


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
