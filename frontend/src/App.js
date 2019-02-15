import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import WeathericonComponent from './components/Weathericon.component';
import CitySearchInputField from './simplecomponents/CitySearchInputField';
import LocationInfo from './simplecomponents/LocationInfo';
import WeatherInfoComponent from './components/WeatherInfo.component';

class App extends Component {
  
  state = {
    weather: [],
    location:{},
    main:{},
    place:'',
    city:''
  }
 
  componentWillMount(){
    if(navigator.geolocation){
      this.geCurrentLocation();
    }
  }

   geCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        this.getWeatherInformationByCordinates(position.coords.longitude,position.coords.latitude);
    });
  }

  getWeatherInformationByCordinates = (longitude, latitude) => {
    axios.post('/weather',{longitude:longitude, latitude:latitude})
    .then(reponse => this.setState({weather: reponse.data.weather, 
                                    location:reponse.data.sys,
                                    main:reponse.data.main, 
                                    place:reponse.data.name}));
  };

  getWeatherByCityandLocation = () => {

  }
  
  handleCityInputFieldChange = (e) => {
    let city = e.target.value;
    this.setState({city:city});
  }

  handleCityInputFieldSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    if(this.state.weather.length === 0) return<div></div>;

    const {
      place,
      location,
      main,
      weather,
      city
    } = this.state;

    const weatherInfo = {
      description:weather[0].description,
      temperature : main.temp,
      minTemperature : main.temp_min,
      maxTemperature : main.temp_max
    }

    const locationInfo = {
      place:place,
      country :location.country
    }
    return (
      <div className="content-holder">
       <LocationInfo {...locationInfo}/>
       <WeatherInfoComponent {...weatherInfo}>
       <WeathericonComponent status={weather[0].id}/>
       </WeatherInfoComponent>
          <CitySearchInputField 
            value={city} 
            handleSubmit={this.handleCityInputFieldSubmit}
            handleChange={this.handleCityInputFieldChange}/>
      </div>
    );
  }
}

export default App;
