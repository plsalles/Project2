const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    res.render('private/paciente/agenda', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/agenda', { message: req.flash('error') });
  }
  else {
    res.render('public/login', { message: req.flash('error') });
  }
});

module.exports = router;