const apiKey = "a2dd402a4a606ef9331d9ec30d914ed6";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=50.32&lon=72.06&units=metric&appid=";

function getCurrentTime() {
  var currentDate = new Date();

  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  var currentTime = currentDate
    .toLocaleString("sv-SE", options)
    .replace(",", "");
  return currentTime;
}

function getAndShowData() {
  var currentTime = getCurrentTime();
  console.log(currentTime);
  document.querySelector(".DateTime").innerHTML = currentTime;

  const WeatherIcon = document.querySelector(".WeatherIcon");
  const response = fetch(apiURL + apiKey)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".City").innerHTML = data.name;
      document.querySelector(".Temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".Windspeed").innerHTML = data.wind.speed + "km/h";
      document.querySelector(".Atmosphericpressure").innerHTML =
        data.main.pressure + "mbar";

      if (data.weather[0].main == "Clouds") {
        WeatherIcon.src = "Images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        WeatherIcon.src = "Images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        WeatherIcon.src = "Images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        WeatherIcon.src = "Images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        WeatherIcon.src = "Images/mist.png";
      }
    });
}

getAndShowData();
setInterval(getAndShowData, 1000);
