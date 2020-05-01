const mongoose = require('mongoose');
const { Schema } = mongoose;


const pacienteSchema = new Schema({
  data: {type: String, require: true},
  email: { type: String, required: true},
  name: { type: String, require:true},
  cpf: { type: String, require: true, unique: true},
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, complemento: { type: String}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true}},
  medicos: [{ type: mongoose.Types.ObjectId, ref: 'Medico'}],
  user: { type: mongoose.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps:true
  }
);

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;