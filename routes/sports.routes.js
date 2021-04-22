const express = require('express');
const Sport = require('../models/Sport.model');
const User = require('../models/User.model');
const router  = express.Router();

// Crear middleware de checkForAuth 
const checkForAuth = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }else{res.redirect(`/login`)}
}


/* GET new sport page */
router.get('/new', checkForAuth, (req, res, next) => {
  res.render('sports/new-sport');
});

router.post(`/new`,(req, res)=>{
  /* req.user --> da acceso al usuario que tiene la sesion iniciada */
  console.log(req.user)
  Sport.create(req.body)
  .then((result)=>{
  User.findByIdAndUpdate(req.user._id, {$push: {sports: result._id}})
  .then(()=>{
    res.redirect(`/profile`)
  })
  })
  .catch((err)=>{
    console.log(err)
  res.render(`error`)
  })
  
})

module.exports = router;
