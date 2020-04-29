const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')
const moment = require('moment');


// Rota Consultas 
router.get('/', async (req, res, next) => {
  const user = req.user;
  const errorMessage = {message: req.flash('error')};
  if(user.role==='PACIENTE'){
    res.render('private/paciente/consultas', {user, errorMessage });
  }
  else {
    res.render('private/medico/consultas', {user, errorMessage });
  }
  
});

//Rota GET para editar consulta
router.get('/editar/realizar/:id', async (req, res, next) => {

  const user = req.user;
  const idConsulta = req.params.id;
  const errorMessage = {message: req.flash('error')};
  const consulta = await Consulta.findOne({_id: idConsulta }).populate('medico').populate('paciente');

  let data = moment(consulta.date).format('YYYY-MM-DD');
  let hora = moment(consulta.date,'YYYY-MM-DD HH:mm').add(3,'hour').format('HH:mm');
  const consultaEditar = {
    ...consulta,
    date: data,
    hora: hora,
  };

  consulta.data = data;
  consulta.novaHora = hora;
  res.render('private/paciente/editar-consulta', consultaEditar);
});

//Rota POST para editar consulta
router.post('/editar/realizar', async (req, res, next) => {

  const user = req.user;
  const consulta = req.body;
  const data = `${consulta.date}T${consulta.hora}:00.000+00:00`;
  let newDate = new Date(data);
  consulta.date = data;
  console.log(consulta)
  const updateConsulta = await Consulta.findByIdAndUpdate({_id: consulta._id},consulta);
  res.redirect('/consultas');
});

//Rota GET para deletar consulta
router.get('/deletar/realizar/:id', async (req, res, next) => {

  const idConsulta = req.params.id;
  const errorMessage = {message: req.flash('error')};
  const consulta = await Consulta.findOneAndRemove({_id: idConsulta });
  res.redirect('/consultas/');
});

//Rota GET para criar consulta
router.get('/criar-consulta', async (req, res, next) => {
  try {
    const user = req.user;
    if(user.role ==="PACIENTE"){
        const paciente = await Paciente.findOne({user:req.user._id});
        const medicosPaciente = [];
        let medico;
        for (let i = 0; i < paciente.medicos.length; i++){
          medico = await Medico.findOne({_id:paciente.medicos[i]});
          medicosPaciente.push(medico);
    
        }
        res.render('private/paciente/criar-consulta', {medicosPaciente});

    } else {
        const medico = await Medico.findOne({user: req.user._id})
        console.log(medico)
        console.log(medico._id)
        const pacientesMedico = await Paciente.find({medicos: medico._id});
        console.log(pacientesMedico)
        res.render('private/medico/criar-consulta', {pacientesMedico});
     
    }
  } catch (error) {
    console.log(error)
  }

});

//Rota POST para criar consulta
router.post('/criar-consulta', async (req, res, next) => {
  try {
    
    const user = req.user;
    if(user.role ==="PACIENTE"){
      const medicoIstance = await Medico.findOne({CRM:req.body.CRM});
      const pacienteIstance = await Paciente.findOne({user:req.user._id});
      const dateMoment = moment(`${req.body.date} ${req.body.hora}`,'YYYY-MM-DD h').subtract(3,'hour')
      const novaConsulta = {paciente: pacienteIstance._id, medico:medicoIstance._id,date:dateMoment,exames:req.body.exames,descricao:req.body.descricao};
      
      if(!medicoIstance) throw Error('Medico Not Found')
  
      if(!pacienteIstance) throw Error('Paciente Not Found')

      const consultaInstace = new Consulta(novaConsulta);
      await consultaInstace.save()

    }
    else if(user.role ==="MEDICO") {
      const medicoIstance = await Medico.findOne({user:req.user._id});
      const pacienteIstance = await Paciente.findOne({cpf:req.body.cpf});
      const dateMoment = moment(`${req.body.date} ${req.body.hora}`,'YYYY-MM-DD h').subtract(3,'hour')
      const novaConsulta = {paciente: pacienteIstance._id, medico:medicoIstance._id,date:dateMoment,exames:req.body.exames,descricao:req.body.descricao};
      
      if(!medicoIstance) throw Error('Medico Not Found')
  
      if(!pacienteIstance) throw Error('Paciente Not Found')

      const consultaInstace = new Consulta(novaConsulta);
      await consultaInstace.save()
    }

    res.redirect('/consultas');
  } catch (error) {
    console.log(error)
    res.redirect('/consultas/criar-consulta');
  }
});


router.get('/finalizar/realizar/:id', async (req, res, next) => {

  const idConsulta = req.params.id;

  const errorMessage = {message: req.flash('error')};
  const consulta = await Consulta.findOne({_id: idConsulta });
  res.render('private/medico/finalizar-consulta', consulta);
});

router.post('/finalizar/', async (req, res, next) => {

  const consultaFinalizar = await Consulta.findByIdAndUpdate({_id: req.body._id}, req.body);
  res.redirect('/consultas');
});


module.exports = router;