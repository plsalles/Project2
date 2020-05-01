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


const user = User.findOne({_id: '5ea049b9a5a28e10fcc54bd8' })
                 .then(user => {
                  user.password = '12345';

                  let hashPassword;
                  const saltRouds = 10;
                  const salt = bcrypt.genSaltSync(saltRouds);
                  hashPassword = bcrypt.hashSync(user.password, salt);
                  user.password = hashPassword;
                  
                  User.findOneAndUpdate({_id: user._id},{password: user.password})
                                     .then(data => console.log(data))
                 
                })




