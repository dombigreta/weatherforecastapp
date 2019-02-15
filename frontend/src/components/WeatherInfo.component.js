import React, { Component } from 'react';

class WeatherInfoComponent extends  Component {
    render(){
        console.log(this.props);
        return(
            <React.Fragment>
                <div>{this.props.description}</div>
                {this.props.children}
                <div> current temperature: {this.props.temperature}</div>
                <div>lowest: {this.props.minTemperature} | highest: {this.props.maxTemperature}</div>
            </React.Fragment>
        )
    }
}

export default WeatherInfoComponent;