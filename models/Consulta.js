
const mongoose = require('mongoose');
const { Schema } = mongoose;


const consultaSchema = new Schema({
  paciente: { type: mongoose.Types.ObjectId, ref: 'Paciente'},
  medico: { type: mongoose.Types.ObjectId, ref: 'Medico'},
  date: { type: Date, required: true},
  status: { type: mongoose.Types, enum:['Realizada','Realizar'] ,default:'Realizar'},
  exames: { type: String },
  descricao: { type: String },
  ata: { type: String },
  },
  {
    timestamps:true
  }
);

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;    