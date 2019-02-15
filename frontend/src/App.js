import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import WeathericonComponent from './components/Weathericon.component';
import CitySearchInputField from './simplecomponents/CitySearchInputField';

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

  formatTemperatureByLocale = (temp) => {
    return temp + ' c°'
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

    
    return (
      <div className="content-holder">
       <div className="main-title">{place} | {location.country}</div>
       <div>{weather[0].description}</div>
       <WeathericonComponent status={weather[0].id}/>
       <div>current temperature: {this.formatTemperatureByLocale(main.temp)}</div>
       <div style={{fontSize:'0.6rem'}}>lowest:{this.formatTemperatureByLocale(main.temp_min)} | highest:{this.formatTemperatureByLocale(main.temp_max)}</div>
        <div>
          <CitySearchInputField 
            value={city} 
            handleSubmit={this.handleCityInputFieldSubmit}
            handleChange={this.handleCityInputFieldChange}/>
          </div>
      </div>
    );
  }
}

export default App;
