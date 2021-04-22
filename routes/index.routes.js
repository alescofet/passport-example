const express = require('express');
const router  = express.Router();
const Sport = require('../models/Sport.model');
const User = require('../models/User.model');

// Crear middleware de checkForAuth 
const checkForAuth = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }else{res.redirect(`/login`)}
}

/* GET Home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get(`/profile`, checkForAuth,(req,res,next)=>{
  User.findById(req.user._id)
  .populate(`sports`)
  .then((result) => {
    res.render(`profile`, result)
  }).catch((err) => {
    console.log(err);
    res.render(`error`)
  });
})

module.exports = router;
