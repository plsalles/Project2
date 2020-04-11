const mongoose = require('mongoose');
const User = require('./models/User');
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


  const firstUser = {
    username: 'plsalles',
    password: '12345',
    role: 'PACIENTE',
    // email: 'plsalles@gmail.com',
    // cpf: 33401203827,
    // endereco: { logradouro: 'Rua Abagiba', numero: 838, bairro: 'Saude', cidade:'Sao Paulo',estado:'SP', cep: '04294000', pais:'Brasil'},
    // medicos: [],
};


let hashPassword;

if (firstUser.password) {
  const saltRouds = 10;
  const salt = bcrypt.genSaltSync(saltRouds);
  hashPassword = bcrypt.hashSync(firstUser.password, salt);
}

firstUser.password = hashPassword;
console.log(firstUser);
const user = new User(firstUser).save()
                      .then(data => console.log(data))
                      .catch(error => console.error.log(error));
console.log(user);



