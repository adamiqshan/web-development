const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const fs = require('fs')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailId;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);
    
    //reading audience id, api keys from api.txt file in the root folder
    var array = fs.readFileSync('api.txt').toString().split('\n');
    audienceId = array[0];
    apiKey = array[1];
    authString = "adams:"+apiKey

    url = "https://us10.api.mailchimp.com/3.0/lists/"+audienceId
    options = {
        auth: authString,
        method: "POST"
    }

    const request = https.request(url, options, function(response){
        response.on('data', function(data){
            
            if(response.statusCode===200){
                res.sendFile(__dirname+'/success.html');
            } else{
                res.sendFile(__dirname+'/failed.html');
            }

            console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

app.listen(3000, function(req, res){
    console.log('server running on port 3000')
});