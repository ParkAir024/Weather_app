const body = document.body;
const btn = document.getElementById('darkModeButton');
let isDarkMode = false;

toggleTheme('LM.jpg', 'white', 'Dark Mode');

btn.innerText = 'Dark Mode';

btn.addEventListener('click', () => {
    if (body.style.backgroundImage.includes('LM.jpg')) {
        toggleTheme('DM.jpg', 'white', 'Light Mode');
    } else {
        toggleTheme('LM.jpg', 'white', 'Dark Mode');
    }
});

function toggleTheme(imageSrc, textColor, nextTheme) {
    body.style.backgroundImage = `url(${imageSrc})`;
    body.style.color = textColor;
    btn.innerText = nextTheme;
}

const locationInput = document.getElementById('location');
const searchButton = document.getElementById('searchButton');
const weatherContainer = document.getElementById('weather-container');

searchButton.addEventListener('click', function () {
    const location = locationInput.value.trim();
    if (location !== '') {
        const apiKey = '5ef95b28522a9883f1f2390f0fbcced8';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp.toFixed();
                const highTemp = data.main.temp_max.toFixed();
                const lowTemp = data.main.temp_min.toFixed();
                const forecast = data.weather[0].description;
                const humidity = data.main.humidity;
                const city = data.name;
                const country = data.sys.country;

                const weatherDetails = `
                    <div class="weather-info">
                        <p>${city}, ${country}</p>
                        <hr>
                        <p>Temp</p>
                        <p>${temperature}°F</p>
                        <hr>
                        <p>High</p>
                        <p>${highTemp}°F</p>
                        <hr>
                        <p>Low</p>
                        <p>${lowTemp}°F</p>
                        <hr>
                        <p>Forecast</p>
                        <p>${forecast}</p>
                        <hr>
                        <p>Humidity</p>
                        <p>${humidity}%</p>
                    </div>
                `;

                weatherContainer.innerHTML = '';
                weatherContainer.insertAdjacentHTML('beforeend', weatherDetails);
            })
    }
});
