const express = require('express');
const router  = express.Router();
const User = require(`../models/User.model`)
const bcrypt = require(`bcrypt`)
const passport = require(`passport`)

// 13. Crear middleware de checkForAuth 
const checkForAuth = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next()
  }else{res.redirect(`/login`)}
}


/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});
/* GET login */
router.get('/login', (req, res, next) => {
  res.render('login', {errorMessage: req.flash(`error`)});
});
/* POST signup page */
router.post('/signup', (req, res, next) => {
  const {username, password} = req.body
  if(username===`` || password===``){
    res.render(`signup`, {errorMessage: `Tienes que rellenar todos los campos`})
  }
  User.findOne({username})
  .then((user)=>{
  if(user){
    res.render(`signup`, {errorMessage:`Este usuario ya existe`})
  } else{
    const hashedPassword = bcrypt.hashSync(password, 10)
    User.create({username, password: hashedPassword})
    .then((result)=>{
      res.redirect(`/login`);
      
    })
  }
  })
  .catch((err)=>{
  console.log(err)
  })
  ;
});
/* POST login */
router.post(`/login`, passport.authenticate(`local`, {
  successRedirect: `/profile`,
  failureRedirect:`/login`,
  failureFlash: true,
  passReqToCallback: true,
}))



/* GET Logout */
router.get(`/logout`, (req, res)=>{
  req.logout()
  res.redirect('/')
})


module.exports = router;