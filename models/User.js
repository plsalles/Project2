const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['PACIENTE', 'MEDICO','ADMIN'], default: 'PACIENTE' },
  ativo: { type: Boolean, required: true, default: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;