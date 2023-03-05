var APIKey = "42d990101d5ed38107db4d33b90d839c";

dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

//Enter city into search field and have it show in results
//Choose a city and have it display the current weather conditions and the five day forecast below

var searchInputEl = document.getElementById("js-search-input");
var searchBtn = document.getElementById("js-search-btn");

var fiveDay = document.getElementById("five-day-forecast")

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

// Humidity and Date not working. Not sure why!

      var currentWeather = document.getElementById('currentCity');
      var cityName = data.name;
      var date = dayjs().format('MM/DD/YYYY')
      var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      var currentTemp = data.main.temp;
      var windSpeed = data.wind.speed;
      var humidity = data.main.humidity
      
      var image = document.createElement("img");

      image.src = icon;

      var heading = document.createElement('h2');
      var tempEl = document.createElement('p');
      var windEl = document.createElement('p');
      var humidityEl = document.createElement('p');
      heading.textContent = `${cityName} ${date}`
      heading.append(image);

      tempEl.textContent = `Temp: ${currentTemp} F`
      windEl.textContent = `Wind: ${windSpeed} mph`
      humidityEl.textContent = `Humidity: ${humidity}%`
      
      currentWeather.append(heading, tempEl, windEl, humidityEl);

      // Not sure what to do here

      // data.weather.list[7]main[temp]

      // 

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
      // console.log(data);


    
      const listOfForecasts = data.list;
      console.log(listOfForecasts);

      const startDate = dayjs().add(1, 'day').startOf('day').unix();

      const endDate = dayjs().add(6, 'day').startOf('day').unix();

      for (let i = 0; i < listOfForecasts.length; i++) {
        const currentForecast = listOfForecasts[i];
        if (currentForecast.dt >= startDate && currentForecast.dt <= endDate) {
        if (currentForecast.dt_txt.includes('12:00:00')) {
          renderForecastCard(currentForecast)
        }
        }
      }

      var date = dayjs().format('MM/DD/YYYY')
      var icon = "https://openweathermap.org/img/w/" + data.list[7].icon + ".png"
      // var currentTemp = data.weather[7].temp;
      // var windSpeed = data.list[7].wind[speed];
      var humidity = data.list[7].main[humidity];
      
      var image = document.createElement("img");

      image.src = icon;

      var heading2 = document.createElement('h2');
      // var tempEl2 = document.createElement('p');
      // var windEl2 = document.createElement('p');
      // var humidityEl2 = document.createElement('p');
      heading2.textContent = `${cityName} ${date}`
      // heading2.append(image);

      // // tempEl2.textContent = `Temp: ${currentTemp} F`
      // windEl2.textContent = `Wind: ${windSpeed} mph`
      // humidityEl2.textContent = `Humidity: ${humidity}%`
      
      // dayCard1.append(heading2, tempEl2, windEl2, humidityEl2);

      // Day one through day 5 append all to five day div

      
      // create loop different dates

      var date2 = data.list[7].dt_txt;
      var temperature2 = data.list[7].main.temp
      var windSpeed2 = data.list[7].wind.speed
      var humidity2 = data.list[7].main.humidity
      var icon = "https://openweathermap.org/img/w/" + data.list[7].weather[7].icon + ".png"
      var image = document.createElement("img");
      image.src = icon;

      fiveDay.append(date, " ", "Temperature: ", temperature, " ","Wind Speed :", 
      windSpeed, " ", "Humidity :", humidity, " ", image, "",
      "Date: ", date2, " ", image, "", "Temperature: ", temperature2, " ","Wind Speed :", 
      windSpeed2, " ", "Humidity :", humidity2, " ", ); 
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

function renderForecastCard(forecastObj) {
  console.log(forecastObj)
  const card = document.createElement('div')
  const date = document.createElement('p')
  const temperature = document.createElement('p')
  const humidity = document.createElement('p')
  const windSpeed = document.createElement('p')
  
  date.textContent = dayjs(forecastObj.dt_txt).format('MM/DD/YYYY')
  temperature.textContent = forecastObj.main.temp;
  humidity.textContent = forecastObj.main.humidity;
  windSpeed.textContent = forecastObj.wind.speed;
  
  var icon = "https://openweathermap.org/img/w/" + forecastObj.weather[0].icon + ".png"

  const iconImage = document.createElement('img')
  iconImage.src = icon

  card.append(date)
  card.append(iconImage)
  card.append(temperature)
  card.append(humidity)
  card.append(windSpeed)

  fiveDay.append(card)

}

searchBtn.addEventListener("click", fetchForecast);
