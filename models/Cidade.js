
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cidadeSchema = new Schema({
  id: { type: Number},
  nome: { type: String},
  estado: { type: String},
});

const Cidade = mongoose.model('Cidade', cidadeSchema);

module.exports = Cidade;

