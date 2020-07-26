const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB',  { useNewUrlParser: true,  useUnifiedTopology: true })

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articleSchema);

//API CALLS

app.get('/articles', function(req, res){
    Article.find({}, function(err, foundItems){
        if(!err){
            res.send(foundItems);
        } else {
            res.send(err);
        }
    } );
});

app.post('/articles', function(req, res){
    const article = new Article({
        title:req.body.title, 
        content: req.body.content});

    article.save(function(err){
        if(!err){
            res.send("added new article succesfully!");
        } else{
            res.send(err);
        }
    });
})

app.listen(3000, function(){
    console.log('server running on port 3000');
});
