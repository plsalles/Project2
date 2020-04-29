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

      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizada'}).populate('medico').sort({date:-1});
      
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

    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})

      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizar'}).populate('paciente').sort({date:-1});
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      console.log(req.user);
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


router.post('/api/medico', async (req, res, next) => {
  try {
      const { name } =req.body
      const medicos = await Medico.find({name: new RegExp(name, "i")}).sort({date:-1})
      console.log(medicos)
    return res.status(200).send(medicos)
    }catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

router.get('/api/paciente/:id', async (req, res, next) => {
  try {
      const { id } =req.params
      const paciente = await Paciente.findOne({_id:id})
      
    return res.status(200).send(paciente)
    }catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

router.get('/api/medico/:id', async (req, res, next) => {
  try {
      const { id } =req.params
      const medico = await Medico.findOne({_id:id})

    return res.status(200).send(medico)
    }catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});


router.post('/api/agenda', async (req, res, next) => {
  try {
      const { date,userId,role } =req.body
      if(!userId || userId==="") throw Error('Not userId found in the requisition body')
      if(role==='MEDICO'){
        const medico = await Medico.findOne({user:userId})
        const consultas = await Consulta.find({medico:medico._id,date: {$gte:moment(`${date} 00:00:00`,'YYYY-MM-DD HH:mm:ss'), $lte:moment(`${date} 23:59:59`,'YYYY-MM-DD HH:mm:ss')}})
        return res.status(200).send(consultas)
      }
      if(role==='PACIENTE'){
        const paciente = await Paciente.findOne({user:userId})
        const consultas = await Consulta.find({ paciente:paciente._id, date:{$gte:moment(`${date} 00:00:00`,'YYYY-MM-DD HH:mm:ss'), $lte:moment(`${date} 23:59:59`,'YYYY-MM-DD HH:mm:ss')}})
        return res.status(200).send(consultas)
      }
    }catch (error) {
    console.log(error)
    return res.status(500).json({error:true,stack:error.stack})
  }
});


//Rota API para buscar todas as consutlas realizadas para um user
router.get('/api/consultas/realizadas/detalhes', async (req, res, next) => {
  try {
    const { role,_id } = req.query;
    const consulta = await Consulta.findOne({_id: _id});
   
    return res.status(200).send(consulta);
   
        
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});


module.exports = router;