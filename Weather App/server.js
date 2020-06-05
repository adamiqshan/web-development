const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

app.get('/', function(req, res){

    //reading api file from directory
    const api = fs.readFileSync('API.txt').toString()
    
    url = "https://api.openweathermap.org/data/2.5/weather?q=trivandrum&appid=" + api + "&units=metric";

    https.get(url, function(response){
        
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherdesc = weatherData.weather[0].description
            const feels = weatherData.main.feels_like
            const icon = weatherData.weather[0].icon

            const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            
            res.write("<h1>The current temperature in in trivandrum is " + temp + " degree celcius</h1>");
            res.write("<h5>The temperature feel like it is " + feels + "degree celcius</h5>");
            res.write("<img src=" + iconUrl + " >");
            res.send()
        });

        
    });
});


app.listen(4000, function(req, res){
    console.log('Server is running on Port 4000')
})