import React from 'react';

const CitySearchInputField = props => {
    const inputStyle = {
    width: '100%', 
    border: 'none',
    boxSizing: 'border-box',
    padding:'0.4rem',
    margin: '0.3rem',
    borderRadius:'0.15rem'};

    const buttonStyle = {
        width: '100%', 
        padding: '0.3rem',
        margin: '0.3rem',
        backgroundColor:'#565656',
        color:'rgba(255,255,255,1)'
    }

    return(<form onSubmit={props.handleSubmit}>
                <input  style={inputStyle} 
                        value={props.value}
                        onChange={props.handleChange}
                        placeholder="type in a city and press enter"/>
                <button type="submit"
                        style={buttonStyle}
                       >click me</button>
            </form>);
    }

export default CitySearchInputField;