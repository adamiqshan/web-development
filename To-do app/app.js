const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname+'/date.js');

const app = express();
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var items = ['Kafka on the shore', 'Python', 'Alchemist'];
let workItems = [];


app.get('/', function(req, res){
    
    let today = date.getDate();

    if (today === 6 || today === 0){
        var day = today.toLocaleDateString('en-US', option);
    }else{
        var day = today.toLocaleDateString('en-US', option);
    }

    res.render('list', {listTitle: day, AddItem:items});
});

app.post('/', function(req, res){
    item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work')
    } else{
        items.push(item);
        res.redirect('/')
    }
    
})

app.get('/work', function(req, res){
    res.render('list', {listTitle: "Work List", AddItem:workItems});
});


app.listen(3000, function(req, res){
    console.log('server running on port 3000');
})
