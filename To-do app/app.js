const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var items = ['Kafka on the shore', 'Python', 'Alchemist'];

app.get('/', function(req, res){
    var today = new Date();
    option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (today === 6 || today === 0){
        var day = today.toLocaleDateString('en-US', option);
    }else{
        var day = today.toLocaleDateString('en-US', option);
    }

    res.render('list', {kindOfDay: day, AddItem:items});
});

app.post('/', function(req, res){
    item = req.body.newItem;
    items.push(item);
    res.redirect('/')
})

app.listen(3000, function(req, res){
    console.log('server running on port 3000');
})
