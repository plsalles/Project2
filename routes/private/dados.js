const express = require('express');
const router = express.Router();
const { User,Medico,Paciente,Consulta } = require('../../models')
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    const userPaciente = await User.findOne({_id: req.user._id});
    const paciente = await Paciente.findOne({user: userPaciente._id});
    return res.render('private/paciente/dados', {userPaciente, paciente, message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    const userMedico = await User.findOne({_id: req.user._id});
    const medico = await Medico.findOne({user: userMedico._id});
    return res.render('private/medico/dados', { userMedico, medico, message: req.flash('error') });
  }
  else {
    return res.render('public/login', { message: req.flash('error') });
  }  
});


router.post('/', async (req, res, next) => {
  try {

    
    
    const dataToUpdate = {name: req.body.name, email: req.body.email, endereco: {logradouro: req.body.logradouro, numero: req.body.numero,complemento: req.body.complemento,bairro: req.body.bairro, cep: req.body.cep, cidade: req.body.cidade, estado: req.body.estado, pais: req.body.pais}};

    console.log(req.body);
    if(req.body.password != ''){
      let hashPassword;
      const saltRouds = 10;
      const salt = bcrypt.genSaltSync(saltRouds);
      hashPassword = bcrypt.hashSync(req.body.password, salt);
      dataToUpdate.password = hashPassword;
      const updatePassword = await User.findOneAndUpdate({_id: req.user._id},{password: dataToUpdate.password});
    }

    console.log(dataToUpdate);
    if(req.user.role ==='MEDICO'){
 
      const updatePaciente = await Medico.findOneAndUpdate({user: req.user._id},dataToUpdate);

     res.redirect('/home');
  
    }
    else if(req.user.role ==='PACIENTE'){

      const updatePaciente = await Paciente.findOneAndUpdate({user: req.user._id},dataToUpdate);

    res.redirect('/home');
    }  
  
  } catch (error) {
    console.log(error)
    res.redirect('/dados');
  }
});


module.exports = router;