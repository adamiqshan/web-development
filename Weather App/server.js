const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  //reading api file from directory

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const api = fs.readFileSync("API.txt").toString();
  var cityName = req.body.cityName;

  url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    api +
    "&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherdesc = weatherData.weather[0].description;
      const feels = weatherData.main.feels_like;
      const icon = weatherData.weather[0].icon;

      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The current temperature in " +
          cityName +
          " is " +
          temp +
          " degree celcius</h1>"
      );
      res.write(
        "<h5>The temperature feel like it is " + feels + " degree celcius</h5>"
      );
      res.write("<img src=" + iconUrl + " >");
      res.send();
    });
  });
});

app.listen(4000, function (req, res) {
  console.log("Server is running on Port 4000");
});
