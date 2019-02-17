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
        cordinates:{
            longitude:undefined,
            locationInfo:undefined
        },
        city:'',
        isWeatherByCordinates:true,
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
        this.setState({isLoading:true});
        if(this.state.isWeatherByCordinates){ 
                if(this.state.cordinates.longitude !== undefined &&  this.state.cordinates.latitude !== undefined){
                    this.getWeatherInformationByCordinates();
                }
                else{
                        navigator.geolocation.getCurrentPosition((position) => {
                            let cordinates = {
                                longitude:position.coords.longitude,
                                latitude:position.coords.latitude
                            };
                            this.setState({cordinates:cordinates}, () => 
                            this.getWeatherInformationByCordinates());
                    });
                }

        }
        else this.getWeatherByCityandLocation();

    }

    getWeatherInformationByCordinates = () => {
    const {longitude, latitude} = this.state.cordinates;
    axios.post('/weather/weatherbycordinates',{longitude:longitude, latitude:latitude, unit:this.state.currentUnit})
    .then(reponse => this.setWeatherAndLocationInformation(reponse.data))
      .then(() => setTimeout(() => this.setState({isLoading:false}),500))
      .catch(err => console.log(err));
    }

    getWeatherByCityandLocation = () => {
        axios.post('/weather/weatherbycityname',{city:this.state.city, unit:this.state.currentUnit})
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
        this.setState({currentUnit:unit}, () => this.geCurrentLocation());
    }

    handleCityInputFieldSubmit = (city) => {
        this.setState({city:city, isWeatherByCordinates:false},() => this.geCurrentLocation());
    }
    render(){
      return <Context.Provider value={this.state}>
           {this.props.children}
        </Context.Provider> 
    }
}

export const Consumer = Context.Consumer;