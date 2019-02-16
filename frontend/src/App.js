import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import WeathericonComponent from './components/Weathericon.component';
import CitySearchInputField from './simplecomponents/CitySearchInputField';
import LocationInfo from './simplecomponents/LocationInfo';
import WeatherInfoComponent from './components/WeatherInfo.component';

import {UnitContext,units} from './Unit.context';

class App extends Component {
  
  state = {
    weather: [],
    location:{},
    main:{},
    place:'',
    city:'',
    unit:units.metric
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
    axios.post('/weather/weatherbycordinates',{longitude:longitude, latitude:latitude, unit:this.state.unit})
    .then(reponse => this.setState({weather: reponse.data.weather, 
                                    location:reponse.data.sys,
                                    main:reponse.data.main, 
                                    place:reponse.data.name}));
  };

  getWeatherByCityandLocation = () => {
    axios.post('/weather/weatherbycityname',{city:this.state.city, unit:this.state.unit})
    .then(reponse => this.setState({weather: reponse.data.weather, 
                                    location:reponse.data.sys,
                                    main:reponse.data.main, 
                                    place:reponse.data.name}));
  }
  
  handleCityInputFieldChange = (e) => {
    let city = e.target.value;
    this.setState({city:city});
  }

  handleCityInputFieldSubmit = (e) => {
    e.preventDefault();
    this.getWeatherByCityandLocation();
  }

  render() {
    if(this.state.weather.length === 0) return<div></div>;

    const {
      place,
      location,
      main,
      weather,
      city,
      unit
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
      <UnitContext.Provider value={unit}>
        unit:<button>metric</button><button>imperial</button>
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
      </UnitContext.Provider>
    );
  }
}

export default App;
