import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {WeatherProvider} from './Weather.context';

ReactDOM.render(
    <WeatherProvider>
    <App />
    </WeatherProvider>, document.getElementById('root'));

serviceWorker.unregister();
