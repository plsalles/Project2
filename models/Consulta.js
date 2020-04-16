
const mongoose = require('mongoose');
const { Schema } = mongoose;


const consultaSchema = new Schema({
  paciente: { type: mongoose.Types.ObjectId, ref: 'Paciente'},
  medico: { type: mongoose.Types.ObjectId, ref: 'Medico'},
  status: { type: mongoose.Types, enum:['Realizada','Realizar'] ,default:'Realizar'},
  exames: { type: String,},
  ata: { type: String},
});

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;    