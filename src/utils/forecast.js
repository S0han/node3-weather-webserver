const request = require('request');

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7e2560dc46df53aeb787d6485617c508&query=' + encodeURIComponent(lat) + ','+ encodeURIComponent(lon) +'&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else { 
            callback(undefined, body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees.');    
        }  
    }); 

}

module.exports = forecast;