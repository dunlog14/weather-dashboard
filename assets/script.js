const apiKey = '0467c31ea22a763122a57012976f1e50';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const weatherCard = document.querySelector('#weather-card');
const weatherHeading = weatherCard.querySelector('h2');
const weatherIcon = weatherCard.querySelector('.icon');
const weatherTemperature = weatherCard.querySelector('.temperature');
const weatherDetails = weatherCard.querySelector('.details');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to fetch weather data');
      }
    })
    .then(data => {
      // Update the weather card with the retrieved data
      weatherHeading.textContent = `${data.name}, ${data.sys.country}`;
      weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherTemperature.textContent = `${Math.round(data.main.temp)}°F`;
      weatherDetails.querySelector('.humidity .value').textContent = `${data.main.humidity}%`;
      weatherDetails.querySelector('.pressure .value').textContent = `${data.main.pressure} hPa`;
      weatherDetails.querySelector('.wind-speed .value').textContent = `${data.wind.speed} m/s`;
      weatherDetails.querySelector('.wind-direction .value').textContent = `${getWindDirection(data.wind.deg)}`;
      
      // Show the weather card
      weatherCard.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


