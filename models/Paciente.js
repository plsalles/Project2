const mongoose = require('mongoose');
const { Schema } = mongoose;


const pacienteSchema = new Schema({
  data: {type: String, require: true},
  email: { type: String, required: true, unique: true },
  name: { type: String, require:true},
  cpf: { type: String, require: true, unique: true},
<<<<<<< HEAD
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, complemento: { type: String}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true}, pais: { type: String, require: true}},
=======
  endereco: { logradouro: { type: String, require: true}, numero: {type: Number, require: true}, bairro: { type: String, require: true}, cidade: { type: String, require: true}, estado: { type: String, require: true}, cep: {type: String, require: true},},
>>>>>>> c07c360008dd38a53ef480e31c1f3b4fc69aab43
  medicos: [{ type: mongoose.Types.ObjectId, ref: 'Medico'}],
  user: { type: mongoose.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps:true
  }
);

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;