import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.css';
import useScript from './hooks/useScript';

// OpenWeatherMap API key and base URL used to access weather data
const api = {
  key: 'cdfe7478940cccfc912420af1e679582',
  base: 'https://api.openweathermap.org/data/2.5/'
}

Modal.setAppElement('#root');


function App() {
  useScript('https://kit.fontawesome.com/875b1b7961.js'); //external script to load icons

  const [query, setQuery] = useState(''); // used to reset search bar when search is complete
  const [weather, setWeather] = useState({}); // weather variable that will hold json data related to weather data
  const [modalState, setModalState] = useState(false);
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
  let renderSwitchIcons = (param, param2) => {
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
        switch (param2) {
          case ('01d'):
            return 'fas fa-sun';
          case ('01n'):
            return 'fas fa-moon-stars';
        }
      case 'Clouds':
        return 'fas fa-clouds';
      case 'Haze':
        return 'far fa-sun-haze'
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
        switch (param2) {
          case ('09n'):
            return 'App App-rain-night';
          case ('10n'):
            return 'App App-rain-night';
          default:
            return 'App App-rain';
        }
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
        switch (param2) {
          case ('02d'):
            return 'App App-cloudy';
          case ('03d'):
            return 'App App-cloudy';
          case ('04d'):
            return 'App App-cloudy';
          case ('02n'):
            return 'App App-cloudy-night';
          case ('03n'):
            return 'App App-cloudy-night';
          case ('04n'):
            return 'App App-cloudy-night';
        }
      case 'Haze':
        return 'App App-haze'
    }

  }

  // uses values returned by getSomething() as the index of the corresponding array
  // ex. if today is tuesday, getDate() will return 2 which we can use as index(n) which n is the day of the week. 
  // n == 2 == Tuesday
  // n == 3 == Wednesday
  // etc
  const dayBuilder = d => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];

    return `${day}`

  }
  const dateBuilder = (d) => {
    let date = d.getDate();

    return `${date}`
  }
  const monthBuilder = d => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    let month = months[d.getMonth()];

    return `${month}`

  }
  const yearBuilder = d => {
    let year = d.getFullYear();

    return `${year}`
  }

  const customStyles = {
    content: {
      color: 'rgb(230,230,230)',
      background: 'rgb(50,50,50)',
      border: '1px solid rgb(230,230,230)'
    },
    overlay: {
      background: 'rgb(25,25,25)'
    }
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
          <i class="far fa-bars" onClick={() => setModalState(true)}></i>

        </div>
        <Modal
          isOpen={modalState}
          onRequestClose={() => setModalState(false)}
          style={customStyles}
          portalClassName='portalClass'
          closeTimeoutMS={250}
        >
          <h1 className='modal-title'>Social</h1>
          <ul className='social-links-container'>
            <li className='social-link'>Instagram</li>
            <li className='social-link'>Facebook</li>
            <li className='social-link'>Twitter</li>
            <li className='social-link'>TikTok</li>
          </ul>
          <div className='close-modal' onClick={() => setModalState(false)}>[X] Close</div>
        </Modal>

        {/* if weather.main is not undefined then render the weather info otherwise render an empty value.
           This is so the app doesn't initially load with weather info */}
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-container">
              <div className="location-icon"><i class="fal fa-map-marker-alt"></i></div>
              <div className="location-info">
                <div className="location">{weather.name}, </div>
                <div className="location-country">{weather.sys.country}</div>
              </div>
            </div>
            <div className="date-container">
              <div className="date-date">{dateBuilder(new Date())}</div>
              <div className="date-day">{dayBuilder(new Date())}</div>
              <div className="date-month">{monthBuilder(new Date())}</div>
              <div className="date-year">{yearBuilder(new Date())}</div>
            </div>
            <div className="temp-container">
              <div className="container-title">Temperature</div>
              <div className="icon-current-container">
                <i class="far fa-thermometer-half"></i>
                <div className="current-temp">{Math.round(weather.main.temp)}°</div>
              </div>
              <div className="high-low-container">
                <div className="temp-high">High: {Math.round(weather.main.temp_max)}°</div>
                <div className="temp-low">Low: {Math.round(weather.main.temp_min)}°</div>
              </div>
              <div className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°</div>
            </div>
            <div className="conditions-container">
              <div className="container-title">Conditions</div>
              <div className="conditions-icon"><i className={renderSwitchIcons(weather.weather[0].main, weather.weather[0].icon)}></i></div>
              <div className="conditions-description">{weather.weather[0].description}</div>
              <div className="humidity-visibility-container">
                <div className="humidity">Humidity: {weather.main.humidity}%</div>
                <div> | </div>
                <div className="visibility">Visibility: {Math.round((weather.visibility) * .0006)} mi</div>
              </div>
              <div className="hv-wind-divider"></div>
              <div className="wind-container">
                <div className="wind-icon">
                  <i class="far fa-wind"></i>
                </div>
                <div className="wind-title">Wind</div>

              </div>
              <div className="deg-gust-speed-container">
                <div className="wind-speed">Wind Speed: {Math.round(weather.wind.speed * 2.23)} mph</div>
                <div className='dgs-divider'> | </div>
                <div className="gust">Gust Speed: {Math.round(weather.wind.gust * 2.23)} mph</div>
                <div className='dgs-divider'> | </div>
                <div className="wind-degree">Direction: {weather.wind.deg}°</div>

              </div>
              <div className="pressure">Pressure: {Math.round(weather.main.pressure * .03)} inHg</div>
            </div>
          </div>
        ) : (
          <div className="title-section">
            <h1 className='title'>React.js Weather App</h1>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
