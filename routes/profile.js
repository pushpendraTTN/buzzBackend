const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const requireLogin = require('../middleware/verifyuser');

router.post('/update_profile',requireLogin,(req,res)=>{
    const { firstName,lastName,designation,myWebsite,gender,DOB,city,state,zipCode } = req.body;
    const data = {
        firstName,
        lastName,
        designation,
        myWebsite,
        gender,
        DOB,
        city,
        state,
        zipCode
    }
    User.findByIdAndUpdate(req.user._id,data)
    .then(result=>{
        console.log("Successfully Update");
        console.log(result);
        res.json({message:"Sucessfully Update"});
    })
    .catch(err=>{
        console.log(err);
    })
});

router.get('/viewloggedInuserDetails',requireLogin,(req,res)=>{
    User.find({_id: req.user._id}).then(data=>{
        console.log('logged in user details=>',data);
        res.json(data);
    })
})




module.exports = router;


