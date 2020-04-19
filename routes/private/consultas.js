




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

router.get('/criar-consulta', async (req, res, next) => {
  try {
    const paciente = await Paciente.findOne({user:req.user._id});
    const medicosPaciente = [];
    let medico;
    for (let i = 0; i < paciente.medicos.length; i++){
      medico = await Medico.findOne({_id:paciente.medicos[i]});
      medicosPaciente.push(medico);

    }
    res.render('private/paciente/criar-consulta', {medicosPaciente});
  } catch (error) {
    console.log(error)
  }

});

router.post('/criar-consulta', async (req, res, next) => {
  try {
    
    console.log(req.body);
    console.log(req.user);
    const medicoIstance = await Medico.findOne({CRM:req.body.CRM});
    const pacienteIstance = await Paciente.findOne({user:req.user._id});
    const timeArray = req.body.date.split('-');
    const date = `${timeArray[2]}${timeArray[1]}${timeArray[0]}`;
    const novaConsulta = {paciente: req.user._id, medico:medicoIstance._id,date:req.body.date,hora:req.body.hora,exames:req.body.exames,descricao:req.body.descricao};
    
    
    if(!medicoIstance) throw Error('Medico Not Found')

   
    if(!pacienteIstance) throw Error('Paciente Not Found')
    // const date = moment(`${req.body.date} ${req.body.hora}`,'DD-MM-YYYY h').subtract(3,'hour')
    console.log(date)
    console.log(novaConsulta)
    const consultaInstace = new Consulta(novaConsulta);

    await consultaInstace.save()
    // return res.status(200).json(consultaInstace)
    res.redirect('/home');
  } catch (error) {
    console.log(error)
    // return res.status(500).send(error)
    res.redirect('/consultas/criar-consulta');
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
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizada'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.get('/realizadas', async (req, res, next) => {
  try {
    console.log(req.user)
    const { role,_id } = req.user
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizada'}).sort({date:-1});

      return res.status(200).send(consultas)

    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizada'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});



router.post('/realizar', async (req, res, next) => {
  try {
    console.log(req.body)
    const { role,_id } = req.body
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizar'}).sort({date:-1});

      return res.status(200).send(consultas)

    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizar'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.get('/realizar', async (req, res, next) => {
  try {
    console.log(req.user)
    const { role,_id } = req.user
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizar'}).sort({date:-1});

      return res.status(200).send(consultas)

    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizar'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});



module.exports = router;