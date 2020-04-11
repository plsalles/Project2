const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Paciente = require('../../models/Paciente');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');


/* Login routes */
router.get('/login', (req, res, next) => {
    res.render('public/login', { message: req.flash('error') });
  });

router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/intranet',
      failureRedirect: '/login',
      failureFlash: true,
      passReqToCallback: true
    })
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

/* Sign Up routes */
router.get('/signup', (req, res, next) => {
  console.log('signing up')
  res.render('public/sign-up', { message: req.flash('error') });
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  
});

module.exports = router;