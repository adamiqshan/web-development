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
    content: String },
    { versionKey: false}
    );

const Article = mongoose.model('Article', articleSchema);

//API CALLS

//chained calls to search all articles

app.route('/articles')

.get(function(req, res){
    Article.find({}, function(err, foundItems){
        if(!err){
            res.send(foundItems);
        } else {
            res.send(err);
        }
    } );
})
.post(function(req, res){
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
.delete(function(req, res){
    Article.deleteMany({}, function(err){
        if(!err){
            res.send('succesfully wiped out your DB');
        } else {
            res.send(err);
        }
    });
});


// app.get('/articles', function(req, res){
//     Article.find({}, function(err, foundItems){
//         if(!err){
//             res.send(foundItems);
//         } else {
//             res.send(err);
//         }
//     } );
// });

// app.post('/articles', function(req, res){
//     const article = new Article({
//         title:req.body.title, 
//         content: req.body.content});

//     article.save(function(err){
//         if(!err){
//             res.send("added new article succesfully!");
//         } else{
//             res.send(err);
//         }
//     });
// });

// app.delete('/articles',function(req, res){
//     Article.deleteMany({}, function(err){
//         if(!err){
//             res.send('succesfully wiped out your DB');
//         } else {
//             res.send(err);
//         }
//     });
// });

//chained calls for specific articles

app.route('/articles/:articleName')

.get(function(req, res){
    Article.findOne({title: req.params.articleName}, function(err, matchingArticle){
        if(!err){
            res.send(matchingArticle);
        } else {
            res.send('No such article was found!')
        }
    });
})

.put(function(req, res){
    Article.update({ title: req.params.articleName }, { title: req.body.title, content: req.body.content }, { overwrite: true }, function(err) {
        if (!err) {
            res.send("Successfully updated");
        }
    });
})

.patch(function(req, res){
    Article.update({title:req.params.articleName}, {$set: req.body}, function(err){
        if(!err){
            res.send('Successfully patched!')
        }
    });
})

.delete(function(req, res){
    Article.deleteOne({title:req.params.articleName}, function(err){
        if (!err){
            res.send('Successfully removed the article')
        } else {
            res.send('there was an error!')
        }
    })
});

app.listen(3000, function(){
    console.log('server running on port 3000');
});
