const express = require('express');
const router = express.Router();
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
      successRedirect: '/home',
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
  res.render('public/sign-up', { message: req.flash('error') });
});

router.post('/signup', async (req, res, next) => {
  const user = {username: req.body.username, password: req.body.password, role: req.body.role};
  let hashPassword;
  let createdUser
  try{
    if (user.password) {
      const saltRouds = 10;
      const salt = bcrypt.genSaltSync(saltRouds);
      hashPassword = bcrypt.hashSync(user.password, salt);
    }
    user.password = hashPassword;
    createdUser = new User(user)
    await createdUser.save()
  }catch(error){
    return res.render('public/sign-up', { message: req.flash('error')})
  }

    const roleUserPaciente = { name: req.body.name,
      email: req.body.email,
        cpf: req.body.cpf,
        endereco:{
        logradouro: req.body.logradouro,
          bairro: req.body.bairro,
          cidade: req.body.cidade,
          estado: req.body.estado,
          numero: req.body.numero,
          cep:    req.body.cep
        }};
      
    const roleUserMedico = { name: req.body.name,
      email: req.body.email, CRM: req.body.CRM, 
      endereco:{
        logradouro: req.body.logradouro,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        numero: req.body.numero,
        cep:    req.body.cep
      },
        especializacao:req.body.especializacao
      };

    try{
    if(user.role === 'MEDICO'){
      roleUserMedico.user = createdUser._id;
      console.log(roleUserMedico)
      const newMedico = new Medico(roleUserMedico)
      await newMedico.save()
    }
    if(user.role === 'PACIENTE'){
      if(req.body.medicoPessoalId){
        let medicoPessoal = await Medico.findById(req.body.medicoPessoalId)
        roleUserPaciente.medicos = [medicoPessoal._id]
      }
      roleUserPaciente.user = createdUser._id;
      console.log(roleUserPaciente)
      const newPaciente = new Paciente(roleUserPaciente)
      await newPaciente.save()
      return res.render('index')
    } 
  }catch(error){ 
    return res.render('public/sign-up', { message: req.flash('error')})
  }

});

// /* Sign Up routes */
// router.get('/dados', async (req, res, next) => {

//   res.render('private/paciente/dados', { message: req.flash('error') });
// });

module.exports = router;