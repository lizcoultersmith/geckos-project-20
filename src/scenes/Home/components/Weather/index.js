import React, { Component } from 'react';
import './styles.scss';
import { weatherIcon } from './weatherIcon';


class Weather extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      isLoading: true,
      error: '',
      lat: '',
      lon: '',
      timeOfDay: 1,
    };
  };

  
  getCurrentWeather () {

    //Example API call: http://api.openweathermap.org/data/2.5/weather?lat=51&lon=-1&units=metric&type=accurate&mode=json&APPID=YOUR_API_KEY
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&type=accurate&mode=json&APPID=${API_KEY}`;
    let date = new Date();
    let timeOfDay = date.getHours();
    console.log(url);
    console.log(timeOfDay);
    return fetch(url)
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
  

componentDidMount() {

// Get the current position of the user
  navigator.geolocation.getCurrentPosition(
  (position) => {
    this.setState(
      (prevState) => ({
        lat: position.coords.latitude, 
        lon: position.coords.longitude
        }), () => { this.getCurrentWeather(); } //Passes geolocation to getCurrentWeather function
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



  render() {

    const { weather, error, isLoading, weatherID, weatherDescription, timeOfDay } = this.state;

      if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    } else {

    return (
   
      
      <div className="app-dash">
      <img src={weatherIcon(weatherID, timeOfDay)} alt={weatherDescription}/>
        <p>{Math.round(weather.main.temp)}&#8451;</p>
        <p>{weather.name}</p>
        </div>  
     
   
    );
  }
}
}

export default Weather

