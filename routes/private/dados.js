const express = require('express');
const router = express.Router();
const { User,Medico,Paciente,Consulta } = require('../../models')
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    const userPaciente = await User.findOne({_id: req.user._id});
    const paciente = await Paciente.findOne({user: userPaciente._id}).populate('medicos');
    console.log('PACIENTE',paciente)
    return res.render('private/paciente/dados', {userPaciente, paciente, message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    const userMedico = await User.findOne({_id: req.user._id});
    const medico = await Medico.findOne({user: userMedico._id});
    const pacientesMedico = await Paciente.find({medicos: medico._id});
    return res.render('private/medico/dados', { userMedico, medico,pacientesMedico, message: req.flash('error') });
  }
  else {
    return res.render('public/login', { message: req.flash('error') });
  }  
});

//Rota para remover medico da pagina de consulta

router.get('/remove-medico/:id', async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.user);
    
    Paciente.findOneAndUpdate({user: req.user._id},{$pull: {medicos: req.params.id }})
            .then(data => {
              console.log('deletando medico',data);
              res.redirect('/dados/');})
            .catch(error => console.log(error));
   
    


} catch (error) {
    console.log(error);
    res.redirect('/dados/');
}
});




//Rota para adicionar medico na pagina de consulta

router.post('/novo-medico/', async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user);
    const paciente = await Paciente.findOne({user: req.user._id});
    console.log(paciente);
    const novoMedico = await Paciente.findByIdAndUpdate({_id:  paciente._id},{$push: {medicos: req.body.medicoPessoalId}})
    console.log(novoMedico)
    res.redirect('/dados');
  
    


} catch (error) {
    console.log(error);
    res.redirect('/dados/');
}
});

router.post('/', async (req, res, next) => {
  try {

    
    
    const dataToUpdate = {name: req.body.name, especializacao: req.body.especializacao, email: req.body.email, endereco: {logradouro: req.body.logradouro, numero: req.body.numero, complemento: req.body.complemento,bairro: req.body.bairro, cep: req.body.cep, cidade: req.body.cidade, estado: req.body.estado, pais: req.body.pais}};

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