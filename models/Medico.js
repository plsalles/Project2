
const mongoose = require('mongoose');
const { Schema } = mongoose;


const medicoSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', unique:true},
  name: { type: String, require:true},
  email: { type: String, required: true},
  CRM: { type: String, require: true, unique: true},
  especializacao: { type: String, require:true},
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, complemento: {type: String}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true}},
  },
  {
    timestamps:true
  }
);

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;