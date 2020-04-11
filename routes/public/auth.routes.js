const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Paciente = require('../../models/Paciente');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');


/* GET home page */
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



module.exports = router;