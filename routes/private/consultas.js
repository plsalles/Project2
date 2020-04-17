const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')


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



module.exports = router;