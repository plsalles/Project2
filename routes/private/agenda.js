const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  const { role } = req.user
  const user = req.user;
  const errorMessage = {message: req.flash('error')};
  if(role==='PACIENTE'){
    res.render('private/paciente/agenda',  {user, errorMessage });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/agenda',  {user, errorMessage });
  }
  else {
    res.render('public/login', { message: req.flash('error') });
  }
});


module.exports = router;