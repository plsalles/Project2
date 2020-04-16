const mongoose = require('mongoose');
const { Schema } = mongoose;


const pacienteSchema = new Schema({
  data: {type: String, require: true},
  email: { type: String, required: true, unique: true },
  cpf: { type: String, require: true, unique: true},
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true},pais: { type: String, require: true}},
  medicos: [{ type: mongoose.Types.ObjectId, ref: 'Medico'}],
  user: { type: mongoose.Types.ObjectId, ref: 'User'},
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;