const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')
const moment = require('moment');



//Rota API para buscar todas as consutlas realizadas para um user
router.get('/api/consultas/realizadas', async (req, res, next) => {
  try {
    const { role,_id } = req.query;
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizada'}).populate('paciente').sort({date:-1});
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id});
      console.log(pacienteIstance)
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizada'}).populate('medico').sort({date:-1});
      console.log(consultas)
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

//Rota API para buscar todas as consultas a realizar para um user
router.get('/api/consultas/realizar', async (req, res, next) => {
  try {
    const { role,_id } = req.query;
    console.log(req.query)
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      console.log(medicoIstance)
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizar'}).populate('paciente').sort({date:-1});
      console.log(consultas)
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      console.log(pacienteIstance)
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizar'}).populate('medico').sort({date:-1});
      console.log(consultas)
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

//Rota API para paciente editar consutla a realizar (edição, data, hora)

router.post('/api/consultas/realizar', async (req, res, next) => {
  try {
    const { role,_id } = req.body;
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizar'}).populate('paciente').sort({date:-1});
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizar'}).populate('medico').sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});


//Rotas api POST para testar com Postman
router.post('/api/consultas/realizadas', async (req, res, next) => {
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


router.post('/api/consultas/realizar', async (req, res, next) => {
  try {
    
    const { role,_id } = req.body
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance.user,status:'Realizar'}).sort({date:-1});

      return res.status(200).send(consultas)

    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      console.log(pacienteIstance);
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance.user,status:'Realizar'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});
/////////////////////////////////////////////////////////



module.exports = router;