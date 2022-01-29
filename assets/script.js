var today = moment().format('L');
var apiKey = "0111ecb58971fc33b9ef27ef46d9d788";

var getLongLat;
var getWeather;

getLongLat = function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=0111ecb58971fc33b9ef27ef46d9d78")
}