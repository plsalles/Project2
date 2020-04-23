
const mongoose = require('mongoose');
const { Schema } = mongoose;


const medicoSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', unique:true},
  name: { type: String, require:true},
  email: { type: String, required: true, unique: true },
  CRM: { type: String, require: true, unique: true},
  especializacao: { type: String, require:true},
<<<<<<< HEAD
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, complemento: {type: String}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true},pais: { type: String, require: true}},
=======
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true},},
>>>>>>> c07c360008dd38a53ef480e31c1f3b4fc69aab43
  },
  {
    timestamps:true
  }
);

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;