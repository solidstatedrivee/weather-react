import React, { useState } from 'react';
import './index.css';
import useScript from './hooks/useScript';

// OpenWeatherMap API key and base URL used to access weather data
const api = {
  key: 'cdfe7478940cccfc912420af1e679582',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {
  useScript('https://kit.fontawesome.com/875b1b7961.js'); //external script to load icons

  const [query, setQuery] = useState(''); // used to reset search bar when search is complete
  const [weather, setWeather] = useState({}); // weather variable that will hold json data related to weather data

  // when enter is hit in the search bar fetch the URL, grab the json file returned by the API, 
  //and set the weather variable to equal json result
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  // return weather-related icons based on weather conditions
  let renderSwitchIcons = param => {
    switch (param) {
      case 'Thunderstorm':
        return 'fas fa-thunderstorm';
      case 'Drizzle':
        return 'fas fa-cloud-drizzle';
      case 'Rain':
        return 'fas fa-cloud-rain';
      case 'Snow':
        return 'fas fa-cloud-snow';
      case 'Fog':
        return 'fas fa-fog';
      case 'Tornado':
        return 'fas fa-tornado';
      case 'Clear':
        return 'fas fa-sun';
      case 'Clouds':
        return 'fas fa-clouds';
    }
  }

  // return weather-related backgrounds based on weather conditions
  let renderSwitchBG = (param, param2) => {
    switch (param) {
      case 'Thunderstorm':
        return 'App App-thunderstorm';
      case 'Drizzle':
        return 'App App-drizzle';
      case 'Rain':
        return 'App App-rain';
      case 'Snow':
        return 'App App-snow';
      case 'Fog':
        return 'App App-fog';
      case 'Tornado':
        return 'App App-tornado';
      case 'Clear':
        switch (param2) {
          case ('01d'):
            return 'App App-clear';
          case ('01n'):
            return 'App App-clear-night';
        }
      case 'Clouds':
        return 'App App-cloudy';

    }

  }

  // uses values returned by getSomething() as the index of the corresponding array
  // ex. if today is tuesday, getDate() will return 2 which we can use as index(n) which n is the day of the week. 
  // n == 2 == Tuesday
  // n == 3 == Wednesday
  // etc
  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <div className={typeof weather.main != 'undefined' ? renderSwitchBG(weather.weather[0].main, weather.weather[0].icon) : 'App'}> {/* return class name based on weather.main returned by json */}
      <main>
        <div className="search-box">
          <i class="far fa-search"></i>
          {/* When a change occurs with search box set the value to current state */}
          <input
            type="text"
            className='search-bar'
            placeholder='Denver, Colorado'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />

        </div>

        {/* if weather.main is not undefined then render the weather info otherwise render an empty value.
           This is so the app doesn't initially load with weather info */}
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location-title">Location</div>

              <i class={renderSwitchIcons(weather.weather[0].main)}></i>
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="weather-title">Weather</div>
              <div className="temp">

                {(Math.round(weather.main.temp))}°F

          </div>
              <div className="weather">
                {weather.weather[0].description}
              </div>
            </div>

          </div>

        ) : (
          <div className="title-section">
            <h1 className='title'>React.js Weather App</h1>
          </div>

        )}


        <div className="social-box">
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
