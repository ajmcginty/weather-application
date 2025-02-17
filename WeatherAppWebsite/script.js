const apiKey = "2678c222eae113c021fde20c3d89240e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.body;

async function checkWeather(city) {
    try {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
        
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "ºF";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
        
        const weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                body.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                body.style.background = "linear-gradient(135deg, #56CCF2, #2F80ED)";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                body.style.background = "linear-gradient(135deg, #3a6186, #89253e)";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                body.style.background = "linear-gradient(135deg, #4CA1AF, #C4E0E5)";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                body.style.background = "linear-gradient(135deg, #636FA4, #E8CBC0)";
                break;
            default:
                body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Auto-detect user location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => checkWeather(data.name));
        });
    }
});
