const express = require('express');
const router = express.Router();
const axios = require('axios');

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';

router.post('/weatherbycordinates', (req,res, next) => {
    axios.get(`${baseUrl}lat=${req.body.latitude}&lon=${req.body.longitude}&units=${req.body.unit}&APPID=${process.env.API_KEY}`)
    .then((reponse) => res.send(reponse.data));
});

router.post('/weatherbycityname', (req,res,next) => {
    axios.get(`${baseUrl}q=${req.body.city}&units=${req.body.unit}&APPID=${process.env.API_KEY}`)
    .then((reponse) => res.send(reponse.data));
});

module.exports = router;