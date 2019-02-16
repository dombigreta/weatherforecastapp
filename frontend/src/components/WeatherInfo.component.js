import React, { Component } from 'react';
import {UnitContext, units} from '../Unit.context';

class WeatherInfoComponent extends  Component {
    formatTemperatureByUnit = (unit, temperature ) => {
        return temperature + ' ' + (unit === units.metric ? '°c' : '°F')
    }
    render(){
        return(
            <UnitContext.Consumer>{
                (value) => <React.Fragment> 
                <div>{this.props.description}</div>
                {this.props.children}
                <div> current temperature: {this.formatTemperatureByUnit(value, this.props.temperature)}</div>
                <div>lowest: {this.formatTemperatureByUnit(value, this.props.minTemperature)} | highest: {this.formatTemperatureByUnit(value, this.props.maxTemperature)}</div>
                    </React.Fragment>
            }
            </UnitContext.Consumer>
        );
    }
}

export default WeatherInfoComponent;