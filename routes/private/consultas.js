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

router.post('/criar-consulta', async (req, res, next) => {
  try {
    const { pacienteCPF,CRM,data,hora,exames,ata } = req.body
    const medicoIstance = await Medico.findOne({CRM})
    if(!medicoIstance) throw Error('Medico Not Found')

    const pacienteIstance = await Paciente.findOne({cpf:pacienteCPF})
    if(!pacienteIstance) throw Error('Paciente Not Found')
    console.log("HORA E DATA")
    const date = moment(`${data} ${hora}`,'DD-MM-YYYY h').subtract(3,'hour')
    console.log(date)

    const consultaInstace = new Consulta({paciente:pacienteIstance._id,medico:medicoIstance._id,CRM,date,exames,ata})

    await consultaInstace.save()
    return res.status(200).json(consultaInstace)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
});


router.post('/realizadas', async (req, res, next) => {
  try {
    console.log(req.body)
    const { role,_id } = req.body
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizada'}).sort({date:-1}); 

      return res.status(200).send(consultas)
  
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({medico:pacienteIstance._id,status:'Realizada'}).sort({date:-1}); 
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});



module.exports = router;