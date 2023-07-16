const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const search = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");
const weatherImg = document.querySelector(".weather-img");
const errorMessage = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "&degC";
        document.querySelector(".weatherDescription").innerHTML = data.weather[0].main;
        document.querySelector(".lowest").innerHTML = "<i class='fa-solid fa-temperature-arrow-down'></i> " + data.main.temp_min + "&degC";
        document.querySelector(".highest").innerHTML = "<i class='fa-solid fa-temperature-arrow-up'></i> " + data.main.temp_max + "&degC";
        document.querySelector(".feelsLike").innerHTML = Math.round(data.main.feels_like) + "&degC";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".windSpeed").innerHTML = data.wind.speed + " km/h";

        // It is not ready yet, because the background will be changed in case of weather changes
        if (data.weather[0].main == "Clouds") {
            weatherImg.src = "./assets/image/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherImg.src = "./assets/image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherImg.src = "./assets/image/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherImg.src = "./assets/image/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherImg.src = "./assets/image/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherImg.src = "./assets/image/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".details").style.display = "flex";

        search.style.border = "none";
        errorMessage.textContent = "";

    } catch (error) {
        search.style.border = "1px solid red";
        errorMessage.innerHTML = "No such country found! Please try again";
        
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".details").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(search.value);
})