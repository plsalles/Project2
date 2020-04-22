const express = require('express');
const router = express.Router();
const { User,Medico,Paciente,Consulta } = require('../../models')

router.get('/', async (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    const user = await User.findOne({_id: req.user._id});
    const paciente = await Paciente.findOne({user: user._id});
    return res.render('private/paciente/dados', {user, paciente, message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    return res.render('private/medico/dados', { message: req.flash('error') });
  }
  else {
    return res.render('public/login', { message: req.flash('error') });
  }  
});


router.post('/', async (req, res, next) => {
  try {

    
    const user = {_id: req.body._id, role: req.body.role, username: req.body.username };
    const paciente = {name: req.body.name, email: req.body.email, cpf: req.body.cpf};
    console.log(user)
    console.log(paciente);
    console.log(req.body);
    console.log(req.user);
    if(req.user.role ==='MEDICO'){
//       const medicoIstance = await Medico.findOne({user:_id})
//       const pacienteIds = await Consulta.find({medico:medicoIstance._id}).distinct('paciente', function(error, pacientes) {
// });   const
//       const pacientes = await Paciente.find({_id:pacienteIds})

     res.redirect('/home');
  
    }
    else if(req.user.role ==='PACIENTE'){
      console.log(`paciente editando`)
//       const pacienteIstance = await Paciente.findOne({user:_id})
//       const medicoIds = await Consulta.find({paciente:pacienteIstance._id}).distinct('medico', function(error, medicos) {
// });
    // const medicos = await Medico.find({_id:medicoIds})
    const updateUser = await User.findOneAndUpdate({_id:req.user._id},user);
    const updatePaciente = await Paciente.findOneAndUpdate({user: req.user._id},paciente);
    console.log(updateUser)
    console.log(updatePaciente)
    res.redirect('/home');
    }  
  
  } catch (error) {
    console.log(error)
    res.redirect('/dados');
  }
});

// router.post('/', async (req, res, next) => {
//   try {
//     const { role,_id } = req.body
//     if(role ==='MEDICO'){
//       const medicoIstance = await Medico.findOne({user:_id})
//       const pacienteIds = await Consulta.find({medico:medicoIstance._id}).distinct('paciente', function(error, pacientes) {
// });
//       const pacientes = await Paciente.find({_id:pacienteIds})

//       return res.status(200).send(pacientes)
  
//     }
//     else if(role ==='PACIENTE'){
//       const pacienteIstance = await Paciente.findOne({user:_id})
//       const medicoIds = await Consulta.find({paciente:pacienteIstance._id}).distinct('medico', function(error, medicos) {
// });
//     const medicos = await Medico.find({_id:medicoIds})

//       return res.status(200).json(medicos)
//     }  
  
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// });



module.exports = router;