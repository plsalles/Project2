const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')
const moment = require('moment')


router.get('/', (req, res, next) => {
  const { role } = req.user
  if(role==='PACIENTE'){
    res.render('private/paciente/consultas', { message: req.flash('error') });
  } 
  else if(role ==='MEDICO'){
    res.render('private/medico/consultas', { message: req.flash('error') });
  }
  else {
    res.render('public/login', { message: req.flash('error') });
  }
});



router.post('/criar', async (req, res, next) => {
  try {
    const { pacienteCPF,CRM,exames,ata } = req.body
    const medicoIstance = await Medico.findOne({CRM})
    if(!medicoIstance) throw Error('Medico Not Found')
    console.log(medicoIstance)

    const pacienteIstance = await Paciente.findOne({cpf:pacienteCPF})
    if(!pacienteIstance) throw Error('Paciente Not Found')
    console.log(pacienteIstance)

    const consultaInstace = new Consulta({paciente:pacienteIstance._id,medico:medicoIstance._id,CRM,exames,ata})
    await consultaInstace.save()
    return res.status(200).json(consultaInstace)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});


router.post('/criar', async (req, res, next) => {
  try {
    const { pacienteCPF,CRM,data,hora,exames,ata } = req.body
    const medicoIstance = await Medico.findOne({CRM})
    if(!medicoIstance) throw Error('Medico Not Found')
    console.log(medicoIstance)

    const pacienteIstance = await Paciente.findOne({cpf:pacienteCPF})
    if(!pacienteIstance) throw Error('Paciente Not Found')
    console.log(pacienteIstance)

    const consultaInstace = new Consulta({paciente:pacienteIstance._id,medico:medicoIstance._id,CRM,exames,ata})
    await consultaInstace.save()
    return res.status(200).json(consultaInstace)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});


router.post('/all', async (req, res, next) => {
  try {
    const { role,_id } = req.body
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizada'})

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