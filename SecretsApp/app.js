//jshint esversion:6
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const passport = require("passport");
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'Oh this is cool',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
},
    { versionKey: false}
);

// const encKey = process.env.ENCKEY
// userSchema.plugin(encrypt, {secret: encKey, encryptedFields: ['password']});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
    res.render('home')
});

app.get('/register', function(req, res){
    res.render('register')
});

app.get('/login', function(req, res){
    res.render('login')
});

app.get('/secrets', function (req, res) {
    if(req.isAuthenticated()){
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
});


app.post('/register', function(req, res){
    User.register({username:req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets')
            });
        }
    });
});

app.post('/login', function(req, res){

// about using username, password in the schema instead of using email, password

/*"MongoDB is a NoSQL database and none of the fields are required. So, even though you defined a schema, you aren't forced to follow it like you would be with a SQL database. When you register your user, you save the username as:
User.register({username: req.body.username} ...
Because of this, the "req.body.username" is saved to a username field and the email field that we had specified before goes uncreated.
If you take a look at your MongoDB database, you should only have a "username" and "password" fields for these entries."*/ 

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets');
            });
        }
        
    })

});


/*Bcrypt
app.post('/register', function(req, res){    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        newUser.save(function(err){
            if (err){
                console.log(err);
            } else {
                res.render('secrets');
            }
        });
        
    });
});

app.post('/login', function(req, res){
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({email: userName}, function(err, foundUser){
        if (err){
            console.log(err)
        } else {
            if (foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    // result == true
                    if(result==true){
                        res.render('secrets')
                    }
                });
            }
        }
    })
});
*/

app.listen(3000, function(){
    console.log('server running on port 3000')
});