import React, { Component } from 'react';
import './App.css';
import WeathericonComponent from './components/Weathericon.component';
import CitySearchInputField from './simplecomponents/CitySearchInputField';
import LocationInfo from './simplecomponents/LocationInfo';
import WeatherInfoComponent from './components/WeatherInfo.component';

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import {Consumer, units} from './Weather.context';

import BeatLoader from 'react-spinners/BeatLoader';

class App extends Component {

  state = {
    city:''
  }

  handleCityInputFieldChange = (e) => {
    let city = e.target.value;
    this.setState({city:city});
  }

  handleCityInputFieldSubmit = (e, cb) => {
    e.preventDefault();
    cb(this.state.city);
  }

  render() {

  return (<Consumer>
          { ({changeUnit, weatherInfo, locationInfo, handleCityInputFieldSubmit, isLoading}) => {
                  if(isLoading) return (<BeatLoader
                                          sizeUnit={"px"}
                                          size={10}
                                          color={'#ffffff'}
                                          loading={true}
                                        />)
            else return  (<div className="content-holder">
                            <LocationInfo {...locationInfo}/>
                            <WeatherInfoComponent {...weatherInfo}>
                            <WeathericonComponent status={weatherInfo.status}/>
                            </WeatherInfoComponent>
                            <ToggleButtonGroup> 
                              <ToggleButton onClick={() => changeUnit(units.metric)} style={{color:'#ffffff'}} value="left">{units.metric}</ToggleButton>
                              <ToggleButton onClick={() => changeUnit(units.imperial)} style={{color:'#ffffff'}} value="right">{units.imperial}</ToggleButton>
                              </ToggleButtonGroup>             
                                <CitySearchInputField 
                                  value={weatherInfo.city} 
                                  handleChange={this.handleCityInputFieldChange}
                                  handleSubmit={(e) => this.handleCityInputFieldSubmit(e, handleCityInputFieldSubmit)}/>
                          </div>
          )
            }
          }
        </Consumer>
    );
  }
}

export default App;
