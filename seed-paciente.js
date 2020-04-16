const mongoose = require('mongoose');
const User = require('./models/User');
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


const user = {
  username: 'Joao',
  password: '12345',
  role: 'PACIENTE',
};

let hashPassword;

if (user.password) {
const saltRouds = 10;
const salt = bcrypt.genSaltSync(saltRouds);
hashPassword = bcrypt.hashSync(user.password, salt);
}

user.password = hashPassword;
const createdUser = new User(user).save()
                    .then(createdUser => {
                      const paciente = {
                        data: '30-12-1990',
                        email: 'joao@gmail.com',
                        cpf: '33133133127',
                        endereco: { logradouro: 'Rua Teste', numero: 100, bairro: 'Tatuape', cidade:'Sao Paulo',estado:'SP', cep: '04294000', pais:'Brasil'},
                        medicos: [],
                        user: createdUser._id,
                      }
                      new Paciente(paciente).save()
                                            .then(data => console.log(data))
                                            .catch(error => console.log(error));
                      })
                    .catch(error => console.log(error));