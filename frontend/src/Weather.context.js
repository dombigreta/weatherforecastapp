import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

export const units = {
    metric:'metric',
    imperial:'imperial'
}
export class WeatherProvider extends Component{
    state = {
        weatherInfo:{},
        locationInfo:{},
        isLoading:true,
        currentUnit:units.metric,
        changeUnit: (unit) => this.changeUnit(unit),
        handleCityInputFieldSubmit:(city) => this.handleCityInputFieldSubmit(city)
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
    axios.post('/weather/weatherbycordinates',{longitude:longitude, latitude:latitude, unit:this.state.currentUnit})
    .then(reponse => this.setWeatherAndLocationInformation(reponse.data))
      .then(() => setTimeout(() => this.setState({isLoading:false}),500));
    }

    getWeatherByCityandLocation = (city) => {
        this.setState({isLoading:true});
        axios.post('/weather/weatherbycityname',{city:city, unit:this.state.currentUnit})
        .then(reponse => this.setWeatherAndLocationInformation(reponse.data))
        .then(() => setTimeout(() => this.setState({isLoading:false}),500));
    }

    setWeatherAndLocationInformation = (data) => {
        let weatherInfo = {
            description: data.weather[0].description,
            status:data.weather[0].id,
            temperature: data.main.temp,
            minTemperature:data.main.temp_min,
            maxTemperature:data.main.temp_max
        }

        let locationInfo = {
            place:data.name,
            country:data.sys.country
        }

        this.setState({weatherInfo: weatherInfo, locationInfo: locationInfo});
    }

    changeUnit(unit){
        this.setState({currentUnit:unit});
    }

    handleCityInputFieldSubmit = (city) => {
        this.getWeatherByCityandLocation(city);
    }
    render(){
      return <Context.Provider value={this.state}>
           {this.props.children}
        </Context.Provider> 
    }
}

export const Consumer = Context.Consumer;