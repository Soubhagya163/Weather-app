const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "<p>City not found.</p>";
    } else {
      const weatherHtml = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong></p>
        <p>Temperature: ${data.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;
      resultDiv.innerHTML = weatherHtml;
    }
  } catch (error) {
    resultDiv.innerHTML = "<p>Failed to fetch weather data.</p>";
  }
}
