var APIKey = "42d990101d5ed38107db4d33b90d839c";

//Enter city into search field and have it show in results
//Choose a city and have it display the current weather conditions and the five day forecast below

var searchInputEl = document.getElementById("js-search-input");
var searchBtn = document.getElementById("js-search-btn");

// Need a function to fetch the forecast from a given location
function fetchForecast() {
  var cityName = searchInputEl.value;
  fetchCityCoordinates(cityName);
}

// Need a function to fetch city coordinates
function fetchCityCoordinates(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

// Added in code below from Amber. Weather info shows up but then disappears

// Daily forecast. Need Today + five additional days
      var currentWeather = document.getElementById('currentCity');
      var cityName = data.name;
      var currentTemp = data.main.temp;
      var windSpeed = data.wind.speed;
      var description = data.weather[0].description;
      var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"

      var image = document.createElement("img");

      image.src = icon;

      currentWeather.append(cityName, " ", currentTemp, " ", windSpeed, " ", description, " ", image);

      // console.log(data);
      // console.log("name", data.name);
      // console.log("current temp", data.main.temp);
      // console.log("wind speed", data.wind.speed);
      // console.log(
      //   "weather desc and icon",
      //   data.weather[0].description,
      //   data.weather[0].icon,
      // );
      var cityLat = data.coord.lat;
      var cityLong = data.coord.lon;
      fetchCityWeather(cityLat, cityLong);
    });
}

// Need a function to fetch city weather
function fetchCityWeather(lat, long) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    APIKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[0]);
      console.log(date);

      // Day one through day 5 append all to five day div

      var fiveDay = document.querySelector(".five-day-forecast")

      // create loop different dates

      var date = data.list[0].dt_txt;
      var temperature = data.list[0].main.temp
      var windSpeed = data.list[0].wind.speed
      var humidity = data.list[0].main.humidity
      var icon = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
      var description = data.list[0].weather[0].description;
      var image = document.createElement("img");
      image.src = icon;

      fiveDay.append("Date: ", date, " ", "Temperature: ", temperature, " ","Wind Speed :", windSpeed, " ", "Humidity :", humidity, " ", description, " ", image, ""); 
      // var currentCity = document.getElementById("currentCity");
      // document.getElementById("current-city");
      // console.log(document.getElementById("currentCity"));
      // currentCity.innerHTML = data.city.name;
      // var cityName = data.city.name;
      // var date = data.list[0].dt_txt;
      // console.log(date);
      // var weatherIcon =
      //   "http://openweathermap.org/img/wn/" +
      //   data.list[0].weather[0].icon +
      //   "@2x.png";
      // console.log(weatherIcon);
      // var weatherIconEl = document.createElement("img");
      // weatherIconEl.src = weatherIcon;
      // weatherIconEl.setAttribute("class", "weather-icon");
      // console.log(weatherIconEl);
      // currentCity.appendChild(weatherIconEl);


    });
}

searchBtn.addEventListener("click", fetchForecast);
