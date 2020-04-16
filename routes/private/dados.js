const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')

router.get('/', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    return res.render('private/paciente/dados', { message: req.flash('error') });
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
    const { role,_id } = req.body
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      const pacienteIds = await Consulta.find({medico:medicoIstance._id}).distinct('paciente', function(error, pacientes) {
});
    const pacientes = await Paciente.find({_id:pacienteIds})

      return res.status(200).send(pacientes)
  
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      const medicoIds = await Consulta.find({paciente:pacienteIstance._id}).distinct('medico', function(error, medicos) {
});
    const medicos = await Medico.find({_id:medicoIds})

      return res.status(200).json(medicos)
    }  
  
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});



module.exports = router;