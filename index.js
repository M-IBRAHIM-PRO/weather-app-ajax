const cityName = document.getElementById('city-name');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const location_unavailable = document.getElementById('location-unavailable');
const weather_body = document.querySelector('.weather-body');

function checkWeather(city) {
    const api_key = "af4ce0673284d1fd1b3a728a5e8caf78";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    const handleWeatherError = () => {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    };

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const weather_data = JSON.parse(xhr.responseText);

                    if (weather_data.cod === '404') {
                        handleWeatherError();
                        return;
                    }

                    location_not_found.style.display = "none";
                    weather_body.style.display = "flex";
                    temperature.innerHTML = `${weather_data.main.temp}°C`;
                    description.innerHTML = `${weather_data.weather[0].description}`;
                    humidity.innerHTML = `${weather_data.main.humidity}%`;
                    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

                    switch (weather_data.weather[0].main) {
                        case 'Clouds':
                            weather_img.src = "./assets/cloud.png";
                            break;
                        case 'Clear':
                            weather_img.src = "./assets/clear.png";
                            break;
                        case 'Rain':
                            weather_img.src = "./assets/rain.png";
                            break;
                        case 'Mist':
                            weather_img.src = "./assets/mist.png";
                            break;
                        case 'Snow':
                            weather_img.src = "./assets/snow.png";
                            break;
                    }
                } catch (error) {
                    console.error("Error parsing weather data", error);
                    handleWeatherError();
                }
            } else {
                handleWeatherError();
                console.error("Failed to fetch weather data");
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}


searchBtn.addEventListener('click', () => {
    checkWeather(cityName.value);
});