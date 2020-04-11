const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Paciente = require('../../models/Paciente');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');

router.get('/intranet', (req, res, next) => {
  //console.log(req.user);
  res.render('private/intranet', { message: req.flash('error') });
});

module.exports = router;