const apiKey = '0dc1f26e88213e5d9cf3c6959d32e2cf'; // Your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByLocation(latitude, longitude);
        }, error => {
            alert('Geolocation is not enabled. Enter a location manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser. Enter a location manually.');
    }
});

function getWeatherByLocation(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    
    if (!data || data.cod !== 200) {
        weatherDataDiv.innerHTML = '<div>Error fetching weather data. Please try again.</div>';
        return;
    }
    
    const location = data.name ? `${data.name}, ${data.sys.country || ''}` : 'Location not available';
    const temperature = data.main && data.main.temp !== undefined ? `${data.main.temp} °C` : 'Temperature not available';
    const weather = data.weather && data.weather[0] && data.weather[0].description ? data.weather[0].description : 'Weather description not available';
    const humidity = data.main && data.main.humidity !== undefined ? `${data.main.humidity}%` : 'Humidity not available';
    const windSpeed = data.wind && data.wind.speed !== undefined ? `${data.wind.speed} m/s` : 'Wind speed not available';

    weatherDataDiv.innerHTML = `
        <div><strong>Location:</strong> ${location}</div>
        <div><strong>Temperature:</strong> ${temperature}</div>
        <div><strong>Weather:</strong> ${weather}</div>
        <div><strong>Humidity:</strong> ${humidity}</div>
        <div><strong>Wind Speed:</strong> ${windSpeed}</div>
    `;
}
