const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Paciente = require('../../models/Paciente');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');

router.get('/intranet', (req, res, next) => {
  res.render('private/intranet', { message: req.flash('error') });
});


router.get('/home', (req, res, next) => {
  res.render('private/intranet', { message: req.flash('error') });
});


router.get('/consultas', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    res.render('private/paciente/consultas', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/consultas', { message: req.flash('error') });
  }
  else {
    res.render('public/login', { message: req.flash('error') });
  }
  
});

router.get('/agenda', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    res.render('private/paciente/agenda', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/agenda', { message: req.flash('error') });
  }
  else {
  }  res.render('public/login', { message: req.flash('error') });
  
});

router.get('/dados', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    res.render('private/paciente/dados', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/dados', { message: req.flash('error') });
  }
  else {
  }  res.render('public/login', { message: req.flash('error') });
  
});


module.exports = router;