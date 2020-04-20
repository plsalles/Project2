const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')
const moment = require('moment');
const axios = require('axios');

// Rota Consultas para usuário logado
router.get('/', async (req, res, next) => {
  const { role } = req.user;
  const queryConsultasRealizadas = await axios.get(`http://localhost:3000/consultas/realizadas?_id=${req.user._id}&role=${role}`);
  const queryConsultasRealizar = await axios.get(`http://localhost:3000/consultas/realizar?_id=${req.user._id}&role=${role}`);

  const consultasRealizar = queryConsultasRealizar.data;
  consultasRealizar.forEach(element => {
    const date = element.date.split('T');
    const time = date[1].split(':00.');
    element.date = date[0];
    element.hora = time[0];
  });

  const consultasRealizadas = queryConsultasRealizadas.data;
  consultasRealizadas.forEach(element => {
    const date = element.date.split('T');
    const time = date[1].split(':00.');
    element.date = date[0];
    element.hora = time[0];
  });

  if(role==='PACIENTE'){
    console.log('ENTROU AQUI!!!!')
    res.render('private/paciente/consultas', {consultasRealizar,consultasRealizadas});
  }
  else if(role ==='MEDICO'){
    res.render('private/medico/consultas', consultas);
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
    const dateMoment = moment(`${req.body.date} ${req.body.hora}`,'DD-MM-YYYY h').subtract(3,'hour')
    const novaConsulta = {paciente: req.user._id, medico:medicoIstance._id,date:dateMoment,exames:req.body.exames,descricao:req.body.descricao};
    
    
    if(!medicoIstance) throw Error('Medico Not Found')

   
    if(!pacienteIstance) throw Error('Paciente Not Found')
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

//Rota API para buscar todas as consutlas realizadas para um user
router.get('/realizadas', async (req, res, next) => {
  try {
    const { role,_id } = req.query;
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance.user,status:'Realizada'}).populate('paciente').sort({date:-1});
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      console.log(_id);
      const pacienteIstance = await Paciente.findOne({user:_id});
      console.log('PACIENTE É',pacienteIstance);
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance.user,status:'Realizada'}).populate('medico').sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

//Rota API para buscar todas as consultas a realizar para um user
router.get('/realizar', async (req, res, next) => {
  try {
    const { role,_id } = req.query;
    if(role ==='MEDICO'){
      const medicoIstance = await Medico.findOne({user:_id})
      if(!medicoIstance) throw Error('Medico Not Found')
      const consultas = await Consulta.find({medico:medicoIstance.user,status:'Realizar'}).sort({date:-1});
      return res.status(200).send(consultas)
    }
    else if(role ==='PACIENTE'){
      const pacienteIstance = await Paciente.findOne({user:_id})
      if(!pacienteIstance) throw Error('Paciente Not Found')
      const consultas = await Consulta.find({paciente:pacienteIstance.user,status:'Realizar'}).populate('medico').sort({date:-1});
      return res.status(200).send(consultas)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
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

// router.get('/realizadas', async (req, res, next) => {
//   try {
//     console.log(req.user)
//     const { role,_id } = req.user
//     if(role ==='MEDICO'){
//       const medicoIstance = await Medico.findOne({user:_id})
//       if(!medicoIstance) throw Error('Medico Not Found')
//       const consultas = await Consulta.find({medico:medicoIstance._id,status:'Realizada'}).sort({date:-1});

//       return res.status(200).send(consultas)

//     }
//     else if(role ==='PACIENTE'){
//       const pacienteIstance = await Paciente.findOne({user:_id})
//       if(!pacienteIstance) throw Error('Paciente Not Found')
//       const consultas = await Consulta.find({paciente:pacienteIstance._id,status:'Realizada'}).sort({date:-1});
//       return res.status(200).send(consultas)
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// });



router.post('/realizar', async (req, res, next) => {
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

// router.get('/realizar', async (req, res, next) => {
//   try {
//     console.log(req.user)
//     const { role,_id } = req.user
//     if(role ==='MEDICO'){
//       const medicoIstance = await Medico.findOne({user:_id})
//       if(!medicoIstance) throw Error('Medico Not Found')
//       const consultas = await Consulta.find({medico:medicoIstance.user,status:'Realizar'}).sort({date:-1});

//       return res.status(200).send(consultas)

//     }
//     else if(role ==='PACIENTE'){
//       const pacienteIstance = await Paciente.findOne({user:_id})
//       if(!pacienteIstance) throw Error('Paciente Not Found')
//       const consultas = await Consulta.find({paciente:pacienteIstance.user,status:'Realizar'}).sort({date:-1});
//       return res.status(200).send(consultas)
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// });



module.exports = router;