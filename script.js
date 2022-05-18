class Weather {
    constructor(city, state) {
        this.apiKey = '4368db269e8f41204a439dfa6b8655d7';
        this.city = city;
        this.state = state;
        this.limit = 1;
    }

    async getWeather() {
        const response_coord = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${this.city},${this.state}&limit=${this.limit}&appid=${this.apiKey}`)
        const responseDataCoord = await response_coord.json();
        this.lat = responseDataCoord[0].lat;
        this.lon = responseDataCoord[0].lon;

        console.log(responseData)
        console.log(this.lon, this.lat);

        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=imperial&appid=${this.apiKey}`)
        const responseData = await response.json();

        //console.log(responseData);

        return responseData;
    }

    changeLocation(city, state) {
        this.city = city;
        this.state = state;

        localStorage.setItem('selectedCity', JSON.stringify(city));
        localStorage.setItem('selectedState', JSON.stringify(state));
        console.log('hello');
    }


    


}

class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelslike = document.getElementById('w-feels-like');
        this.pressure = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
    }

    paint(weatherData) {
        this.location.textContent = weatherData.name;
        this.desc.textContent = weatherData.weather[0].description;
        this.string.textContent = weatherData.main.temp + ' \u00B0F';
        this.humidity.textContent = `Relative Humidity: ${weatherData.main.humidity} %`;
        this.feelslike.textContent = `Feels Like: ${weatherData.main.feels_like} \u00B0F`;
        this.pressure.textContent = `Pressure: ${weatherData.main.pressure} hPa`
        this.wind.textContent = `Wind: ${weatherData.wind.speed} mph`
    }
}

//Init object
let weather = new Weather('San Jose', 'California');

//get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather());
//getWeather2();
//weather.changeLocation('Miami', 'Florida');
function getWeather() {
    //get city and state from local storage otherwise use san jose

    const city = JSON.parse(localStorage.getItem('selectedCity'));
    const state = JSON.parse(localStorage.getItem('selectedState'));

    

    if (city !== null && state !== null) {
        weather = new Weather(city, state);
        console.log('weather');
    } 


    weather.getWeather()
    .then(results => {
        console.log(results)
        const ui = new UI();
        ui.paint(results);
    })
    .catch(err => console.log(err));

}

const saveChanges = document.getElementById('w-change-button');
saveChanges.addEventListener('click', (e) => {
    console.log('Hello');
    const newCity = document.getElementById('city');
    const newState = document.getElementById('state');
    console.log(newCity.value, newState.value);
    weather.changeLocation(newCity.value, newState.value);
    getWeather();

})