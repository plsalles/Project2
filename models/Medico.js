
const mongoose = require('mongoose');
const { Schema } = mongoose;


const medicoSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', unique:true},
  name: { type: String, require:true},
  email: { type: String, required: true, unique: true },
  CRM: { type: String, require: true, unique: true},
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true},pais: { type: String, require: true}},
});

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;