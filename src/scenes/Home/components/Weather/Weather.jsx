import React, { Component } from 'react';
import './styles.scss';
import { weatherIcon } from './WeatherIcon';
import WeatherExpanded from './WeatherExpanded';
import WeatherToday from './WeatherToday';


class Weather extends Component {

<<<<<<< HEAD
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      isLoading: true,
      error: '',
      lat: '',
      lon: '',
      timeOfDay: 1,
      isShowingWeather: false,
      weatherForecast: {},
    };
  };

  
  getCurrentWeather () {

    //Example API call: http://api.openweathermap.org/data/2.5/weather?lat=51&lon=-1&units=metric&type=accurate&mode=json&APPID=YOUR_API_KEY
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    let currentURL = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&type=accurate&mode=json&APPID=${API_KEY}`;
    let date = new Date();
    let timeOfDay = date.getHours();
    console.log(currentURL);
    console.log(timeOfDay);
    return fetch(currentURL)
    .then(response => response.json())
    .then((data) =>
      this.setState({ 
        timeOfDay: timeOfDay,
        weather: data,
        weatherID: data.weather[0].id,
        weatherDescription: data.weather[0].description,
        isLoading: false  
      })
      )
    .catch(error => 
      this.setState({ 
        error, 
        isLoading: false 
      })
      );
  }

  getForecastWeather () {
    //Forecast API call...
    //http://api.openweathermap.org/data/2.5/forecast?lat=51&lon=-1&units=metric&type=accurate&mode=json&APPID=${API_KEY}
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    let forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&type=accurate&mode=json&APPID=${API_KEY}`;
    console.log(forecastURL);
    return fetch(forecastURL)
    .then(response => response.json())
    .then((data) =>
      this.setState({ 
        weatherForecast: data,
      })
      )
    .catch(error => 
      this.setState({ 
        error, 
        isLoading: false 
      })
      );
  }

componentDidMount() {

// Get the current position of the user
  navigator.geolocation.getCurrentPosition(
  (position) => {
    this.setState(
      (prevState) => ({
        lat: position.coords.latitude, 
        lon: position.coords.longitude
        }), () => { this.getCurrentWeather();
                    this.getForecastWeather(); } //Passes geolocation to getCurrentWeather and getForecastWeather functions
    );
},
    (error) => this.setState({ error: error }),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
)
}

/*
initial weather should display icon, temp and location and be clickable to expand...
Icon eg. For code 501 - moderate rain icon = "10d"
URL is http://openweathermap.org/img/w/10d.png */


//Function for opening/closing modal for expanded view
onToggleOpenWeather = (e) => {
  this.setState((prevState) =>
  ({
   isShowingWeather: !prevState.isShowingWeather
 })
)
}



  render() {

    const { weather, error, isLoading, weatherID, weatherDescription, timeOfDay } = this.state;
  
      if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    } else {

    return (
   
      <div className="weather-app-container weather">
      <div className="weather-container-small" onClick={this.onToggleOpenWeather}>
      <div className="weather-wrapper">
      <div className="weather-stat">
      <img className="weather-icon" src={weatherIcon(weatherID, timeOfDay)} alt={weatherDescription}/>
        <p>{Math.round(weather.main.temp)}&deg;</p>
      </div>
      </div>
      <div className="weather-location-label"> 
        <p>{weather.name}</p>
        </div> 
        </div>
      <div>
      
      {this.state.isShowingWeather &&
              <WeatherExpanded
              weather={this.state.weather}
              weatherID={this.state.weatherID}
              timeOfDay={this.state.timeOfDay}
              weatherDescription={this.state.weatherDescription}
              weatherForecast={this.state.weatherForecast}
          />
            }
            
        </div>
      </div>
   
    );
  }
}
=======
	constructor(props) {
		super(props);

		this.state = {
			weather: {},
			isLoading: true,
			lat: '',
			lon: '',
			timeOfDay: 1,
			isShowing: false
		};
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				});
				console.log(this.state.lat, this.state.lon);
				this.getCurrentWeather();
			},
			error => console.error(error));
	}

	render() {

		const { weather, isLoading, weatherID, weatherDescription, timeOfDay } = this.state;

		return (
			<div>
				{
					isLoading ? <p>Loading ... </p>
						:
						<WeatherToday
							toggleOpen={this.onToggleOpen}
							imgSrc={weatherIcon(weatherID, timeOfDay)}
							imgAlt={weatherDescription}
							weather={weather}
						/>
				}

				{this.state.isShowing &&
					<WeatherExpanded
						onToggleOpen={this.onToggleOpen}
						weather={this.state.weather}
						weatherID={weatherID}
						timeOfDay={this.state.timeOfDay}
						weatherDescription={weatherDescription}
					/>
				}
			</div>

		);
	}

	async getCurrentWeather() {

		// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
		const API_KEY = '9c77935cf1f7d3fae12ebf15913a8b2d';
		let url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&type=accurate&mode=json&APPID=${API_KEY}`;

		let date = new Date();
		let timeOfDay = date.getHours();

		const response = await fetch(url);
		const weatherData = await response.json();

		console.log('DATA', weatherData);
		this.setState({
			timeOfDay: timeOfDay,
			weather: weatherData,
			weatherID: weatherData.weather[0].id,
			weatherDescription: weatherData.weather[0].description,
			isLoading: false
		});
	}

	onToggleOpen = (e) => {
		this.setState((prevState) => ({
			isShowing: !prevState.isShowing
		})
		)
	}
>>>>>>> 06d22467a65053121d63b1cc72645223d32bf2ac
}

export default Weather

