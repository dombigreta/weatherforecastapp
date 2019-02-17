import React, { Component } from 'react';

import {Consumer,units} from '../Weather.context';

class WeatherInfoComponent extends Component {
    formatTemperatureByUnit = (unit, temperature ) => {
       return temperature + ' ' + (unit === units.metric ? '°C' : '°F');
    }
    render(){
        return(
              <Consumer>
                  {
                      ({currentUnit}) => <React.Fragment> 
                                    <div>{this.props.description}</div>
                                    {this.props.children}
                                    <div> current temperature: {this.formatTemperatureByUnit(currentUnit, this.props.temperature)}</div>
                                    <div>lowest: {this.formatTemperatureByUnit(currentUnit, this.props.minTemperature)} | highest: {this.formatTemperatureByUnit(currentUnit, this.props.maxTemperature)}</div>
                                </React.Fragment>

                  }
                  </Consumer>
        );
    }
}

export default WeatherInfoComponent;