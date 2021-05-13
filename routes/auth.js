const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth/googleauth')(passport);
const cors = require('cors');
const session = require('express-session')

const app = express();

app.use(cors());

// app.use(session({
//     secret: "abcdef",
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize());
// app.use(passport.session());


// router.get('/',isLoggedIn,(req,res)=>{
//     res.send("hello from auth route");
// });

// router.get('/google',(req,res,next)=>{
//     console.log("reached google");
//     next();
// }, passport.authenticate('google', { scope: ['profile', 'email',] }));

// router.get('/auth/google/callback',(req,res,next)=>{
//     console.log('reached');
//     next();
// },passport.authenticate('google',{successRedirect: '/',failureRedirect: "www.youtube.com"}));


// function isLoggedIn(req,res,next){
//     console.log(req.isAuthenticated())
//     req.isAuthenticated() ? next() : res.sendStatus(401)
// }

module.exports = router;