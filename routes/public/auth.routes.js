const express = require('express');
const router = express.Router();
const Cidade = require('../../models/Cidade');
const User = require('../../models/User');
const Paciente = require('../../models/Paciente');
const Medico = require('../../models/Medico');
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
router.get('/signup', async (req, res, next) => {
  const cidades = await Cidade.find();
  res.render('public/sign-up', { message: req.flash('error') });
});

router.post('/signup', async (req, res, next) => {

  const user = {username: req.body.username, password: req.body.password, role: req.body.role};
  const roleUserPaciente = { name: req.body.name, email: req.body.email, cpf: req.body.cpf, logradouro: req.body.logradouro, bairro: req.body.bairro, cidade: req.body.cidade, estado: req.body.estado, numero: req.body.numero, medico: req.body.medico, };
  const roleUserMedico = { name: req.body.name, email: req.body.email, crm: req.body.crm, logradouro: req.body.logradouro, bairro: req.body.bairro, cidade: req.body.cidade, estado: req.body.estado, numero: req.body.numero };

  const createdUser = new User(user).save()
                      .then(createdUser => {
                        if(user.role === 'MEDICO'){
                          roleUserMedico.user = createdUser._id;
                          console.log(roleUserMedico)
                          new Medico(roleUserMedico).save()
                                                    .then(data => {
                                                      console.log(data);
                                                      res.redirect('/')})
                                                    .catch(error => {
                                                      console.log(error)
                                                      res.render('public/sign-up', { message: req.flash('error')})}
                                                    );

                        }

                        if(user.role === 'PACIENTE'){
                          roleUserPaciente.user = createdUser._id;
                          console.log(roleUserPaciente)
                          new Paciente(roleUserPaciente).save()
                                            .then(data => {
                                              console.log(data);
                                              res.redirect('/')})
                                            .catch(error => {
                                              console.log(error)
                                              res.render('public/sign-up', { message: req.flash('error')})}
                                            );
                        }
                      })
                      .catch(error => res.render('public/sign-up', { message: req.flash('error')}));

});

module.exports = router;