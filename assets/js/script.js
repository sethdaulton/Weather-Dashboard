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

      var city = localStorage.getItem("city");

      var currentWeather = document.getElementById('currentCity');
      var cityName = data.name;
      var date = dayjs().format('MM/DD/YYYY')
      var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      var currentTemp = data.main.temp;
      var windSpeed = data.wind.speed;
      var humidity = data.main.humidity
      
      var image = document.createElement("img");

      image.src = icon;

      const currentWeatherCard = document.createElement('div')
      var heading = document.createElement('h1');
      var tempEl = document.createElement('p');
      var windEl = document.createElement('p');
      var humidityEl = document.createElement('p');
      heading.textContent = `${cityName} ${date}`
      heading.append(image);

      tempEl.textContent = `Temp: ${currentTemp} F`
      windEl.textContent = `Wind: ${windSpeed} mph`
      humidityEl.textContent = `Humidity: ${humidity}%`
      
      currentWeather.append(currentWeatherCard, heading, tempEl, windEl, humidityEl);

      var cityLat = data.coord.lat;
      var cityLong = data.coord.lon;
      fetchCityWeather(cityLat, cityLong);

      userCitySpan.textContent = city;

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

    });
}

function renderForecastCard(forecastObj) {
  console.log(forecastObj)

  const card = document.createElement('div')
  const date = document.createElement('h2')
  const temperature = document.createElement('p')
  const humidity = document.createElement('p')
  const windSpeed = document.createElement('p')

  date.textContent = dayjs(forecastObj.dt_txt).format('MM/DD/YYYY')
  temperature.textContent = `Temp: ${forecastObj.main.temp} F`;
  humidity.textContent = `Humidity: ${forecastObj.main.humidity} %`;
  windSpeed.textContent = `Wind Speed: ${forecastObj.wind.speed} mph`;
  
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
