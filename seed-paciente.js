const mongoose = require('mongoose');
const Paciente = require('./models/Paciente');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

mongoose
  .connect('mongodb://localhost/project2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


  const firstPaciente = {
    data: '28-09-1985',
    email: 'plsalles@gmail.com',
    cpf: 33401203827,
    endereco: { logradouro: 'Rua Abagiba', numero: 838, bairro: 'Saude', cidade:'Sao Paulo',estado:'SP', cep: '04294000', pais:'Brasil'},
    medicos: [],
    user: '5e91c39fd36f6f0ddc9cd950',
};


let hashPassword;

if (firstPaciente.password) {
  const saltRouds = 10;
  const salt = bcrypt.genSaltSync(saltRouds);
  hashPassword = bcrypt.hashSync(firstUser.password, salt);
}

firstPaciente.password = hashPassword;
console.log(firstPaciente);
const paciente = new Paciente(firstPaciente).save()
                      .then(data => console.log(data))
                      .catch(error => console.error.log(error));
console.log(paciente);



