const express = require('express');
const mongoose = require('./config/dbConnection');
const route = require('./routes/auth');
// const cors = require('cors');

const passport = require('passport');
require('./auth/googleauth')(passport);
const session = require('express-session')

const app = express();
const port = process.env.port || 8000;


// app.options('*', cors(
//     cors.CorsOptions = {
//         origin: 'http://localhost:3000'
//       }
// ));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
    });

app.use(express.json());
// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//          optionsSuccessStatus: 200 
//     }
// ));



app.use(route);

app.use(session({
    secret: "abcdef",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


app.get('/',isLoggedIn,(req,res)=>{
    res.send("hello from auth route");
});

app.get('/google',(req,res,next)=>{
    console.log("reached google");
    next();
}, passport.authenticate('google', { scope: ['profile', 'email',] }));

app.get('/auth/google/callback',(req,res,next)=>{
    console.log('reached');
    next();
},passport.authenticate('google',{successRedirect: '/',failureRedirect: "www.youtube.com"}));


function isLoggedIn(req,res,next){
    console.log(req.isAuthenticated())
    req.isAuthenticated() ? next() : res.sendStatus(401)
}


app.listen(port, ()=>{
    console.log(`server is up and running at port ${port}`);
});
