const express = require('express');
const router = express.Router();
const { Medico,Paciente,Consulta } = require('../../models')
const moment = require('moment');


// Rota Consultas para paciente
router.get('/', async (req, res, next) => {
  const user = req.user;
  const errorMessage = {message: req.flash('error')};
  if(user.role==='PACIENTE'){
    res.render('private/paciente/consultas', {user, errorMessage });
  }
  else {
    console.log(req.user)
    res.render('private/medico/consultas', {user, errorMessage });
  }
  
});

//Rota GET para editar consulta
router.get('/editar/realizar/:id', async (req, res, next) => {

  const user = req.user;
  const idConsulta = req.params.id;
  const errorMessage = {message: req.flash('error')};
  const consulta = await await Consulta.findOne({_id: idConsulta }).populate('medico').populate('paciente');
  console.log(consulta)
  // const dataMoment = moment(`${consulta.date}`,'YYYY-MM-DD h');
  // const horaMoment = moment(`${consulta.date}`,'h');
  res.render('private/paciente/editar-consulta', consulta);
});

//Rota POST para editar consulta
router.post('/editar/realizar', async (req, res, next) => {

  const user = req.user;
  const consulta = req.body;
  const updateConsulta = await Consulta.findByIdAndUpdate({_id: consulta._id},consulta);
  console.log(updateConsulta)
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
        console.log(req.user)
        const paciente = await Paciente.findOne({user:req.user._id});
        const medicosPaciente = [];
        let medico;
        for (let i = 0; i < paciente.medicos.length; i++){
          medico = await Medico.findOne({_id:paciente.medicos[i]});
          medicosPaciente.push(medico);
    
        }
        res.render('private/paciente/criar-consulta', {medicosPaciente});

    } else {
      
        const pacientes = await Paciente.find({medico:req.user._id}).sort({name: 1});
        console.log(pacientes)
        
       
        for (let i = 0; i < paciente.medicos.length; i++){
          medico = await Medico.findOne({_id:paciente.medicos[i]});
          medicosPaciente.push(medico);
    
        }
    }
  } catch (error) {
    console.log(error)
  }

});

//Rota POST para criar consulta
router.post('/criar-consulta', async (req, res, next) => {
  try {
    
    console.log(req.body);
    console.log(req.user);
    const medicoIstance = await Medico.findOne({CRM:req.body.CRM});
    const pacienteIstance = await Paciente.findOne({user:req.user._id});
    const dateMoment = moment(`${req.body.date} ${req.body.hora}`,'YYYY-MM-DD h').subtract(3,'hour')
    const novaConsulta = {paciente: pacienteIstance._id, medico:medicoIstance._id,date:dateMoment,exames:req.body.exames,descricao:req.body.descricao};
    
    
    if(!medicoIstance) throw Error('Medico Not Found')

   
    if(!pacienteIstance) throw Error('Paciente Not Found')
    const consultaInstace = new Consulta(novaConsulta);

    await consultaInstace.save()

    res.redirect('/consultas');
  } catch (error) {
    console.log(error)
    res.redirect('/consultas/criar-consulta');
  }
});


module.exports = router;