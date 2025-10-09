import "./style.css";

const address = document.querySelector(".address");
const desc = document.querySelector(".desc");
const temp = document.querySelector(".temp");
const feelslike = document.querySelector(".feelslike");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const form = document.querySelector("form");
const input = document.querySelector("input");
const toggleTempBtn = document.querySelector(".toggle-temp");
let currentData;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(input.value);
  form.reset();
});

function processedData(data) {
  const currentConditions = {
    address: data.address,
    desc: data.currentConditions.conditions,
    tempF: Math.floor(data.currentConditions.temp),
    tempC: Math.floor((5 / 9) * (data.currentConditions.temp - 32)),
    feelslikeF: Math.floor(data.currentConditions.feelslike),
    feelslikeC: Math.floor((5 / 9) * (data.currentConditions.feelslike - 32)),
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    humidity: data.currentConditions.humidity,
    pressure: data.currentConditions.pressure,
  };
  return currentConditions;
}

async function getWeather(location) {
  const card = document.querySelector(".card");
  const errDiv = document.querySelector(".errDiv");
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=W26XATDXJHE9D4S4VLU9JC6JM`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found, please write a valid name");
    }
    const locationData = await response.json();
    const finalData = processedData(locationData);
    display(finalData);
    card.classList.remove("hide");
    errDiv.classList.add("hide")
  } catch (error) {
    card.classList.add("hide");
    errDiv.textContent = error.message;
    errDiv.classList.remove("hide");
  }
}
getWeather("Khartoum")

function display(data) {
  currentData = data;
  address.textContent = data.address.toUpperCase();
  desc.textContent = data.desc;
  temp.textContent = `${data.tempC}°C`;
  feelslike.textContent = `Feels Like: ${data.feelslikeC}°C`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  pressure.textContent = `Pressure: ${data.pressure}mbar`;
  sunrise.textContent = `Sunrise: ${data.sunrise.slice(0, 5)}`;
  sunset.textContent = `Sunset: ${data.sunset.slice(0, 5)}`;

}

toggleTempBtn.addEventListener("click", () => {
  if (toggleTempBtn.textContent === "°C") {
    toggleTempBtn.textContent = "°F";
    temp.textContent = `${currentData.tempF}°F`;
    feelslike.textContent = `Feels Like: ${currentData.feelslikeF}°F`;
  } else if (toggleTempBtn.textContent === "°F") {
    toggleTempBtn.textContent = "°C";
    temp.textContent = `${currentData.tempC}°C`;
    feelslike.textContent = `Feels Like: ${currentData.feelslikeC}°C`;
  }
});
