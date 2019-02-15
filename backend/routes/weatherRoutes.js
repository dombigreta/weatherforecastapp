const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/', (req,res, next) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&units=metric&APPID=${process.env.API_KEY}`)
    .then((payload) => res.send(payload.data));
});

module.exports = router;