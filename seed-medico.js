const mongoose = require('mongoose');
const User = require('./models/User');
const Medico = require('./models/Medico');
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
    username: 'david',
    password: '12345',
    role: 'MEDICO',
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
                        
                          const medico = {
                          name: 'David Uip',
                          email: 'david@gmail.com',
                          crm: '111111-1',
                          endereco: { logradouro: 'Rua Pamplona', numero: 838, bairro: 'Jardins', cidade:'Sao Paulo',estado:'SP', cep: '04294000', pais:'Brasil'},
                          user: createdUser._id,
                          }
                          new Medico(medico).save()
                                            .then(data => console.log(data))
                                            .catch(error => console.error.log(error));
                      })
                      .catch(error => console.error.log(error));







