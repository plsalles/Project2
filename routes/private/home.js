const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const { role } = req.user;
  if(role==='PACIENTE'){
    return res.render('private/paciente/home', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    return res.render('private/medico/home', { message: req.flash('error') });
  }
  else {
    return res.render('public/login', { message: req.flash('error') });
  }  
});


module.exports = router;