
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cidade = require('./models/Cidade');
const cidades = require('./data/cidades');

mongoose
  .connect('mongodb://localhost/project2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

Cidade.insertMany(cidades)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    
