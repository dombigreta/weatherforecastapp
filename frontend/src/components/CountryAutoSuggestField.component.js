import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

import {Consumer} from '../Weather.context';

const renderSuggestionInputField = (inputProps) => {
    const {inputRef = () => {},ref, ...args} = inputProps;
    return (<TextField
                fullWidth
                InputProps={{
                    inputRef:node => {
                        ref(node);
                        inputRef(node);
                    }
                }}
                {...args}
            />);
}
const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => {
    return <MenuItem component="div"><div>{suggestion.name}</div></MenuItem>
}

let cities = [];

class CountryAutoSuggestFieldComponent extends Component{
    state = {
        value:'',
        suggestions:[],
        countries:[]
    }

    onChange = (event, {newValue}) => {
        this.setState({value:newValue});
    }

    getSuggestions = ({value, reason}) => {
        const inputValue = value.trim().toLowerCase();
        if(inputValue.length < 3) return [];
        axios.post('/weather/getCities',{value:inputValue}).then((response) => {
            this.setState({countries:response.data},() => {
                cities = [];
                cities.push(...this.state.countries.map(x => x.split(',')[0].trim())
                        .filter((element, index, array) => array.indexOf(element) === index)
                        .map((x,i) => ({id:i, name:x})));
            });
        });
       return cities;

    }

    onSuggestionsFetchRequested = (value) => {
            this.setState({
                suggestions:this.getSuggestions(value)
            })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions:[]
        });
    }

    handleSubmit = (e,cb) => {
        e.preventDefault();
       cb(this.state.value);
    }

    render(){
        const {value, suggestions} = this.state;

        const autoSuggestProps = {
            renderInputComponent:renderSuggestionInputField,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        }
        
        const classes = {
            container: {
                position: 'relative',
                color:'#FFFFFF'
              },
              suggestionsContainerOpen: {
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
              },
              suggestion: {
                display: 'block',
              },
              suggestionsList: {
                margin: 0,
                padding: 0,
                listStyleType: 'none',
              }
        };
        
        const inputProps = {
            placeholder:'type in a city name',
            value,
            onChange: this.onChange
        }

        return ( 
             <Consumer>
                {
                    ({handleCityInputFieldSubmit}) => {
                       return <form onSubmit={(e) => this.handleSubmit(e,handleCityInputFieldSubmit)}>
                                    <Autosuggest
                                    {...autoSuggestProps}
                                    inputProps={inputProps}
                                    theme={{
                                    container: classes.container,
                                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                    suggestionsList: classes.suggestionsList,
                                    suggestion: classes.suggestion,}}
                                    />
                                </form>
                    }
                }
            </Consumer>);

    }
}

export default CountryAutoSuggestFieldComponent;