module.exports = app => {
app.use('/consultas',require('./consultas'))
app.use('/agenda',require('./agenda'))
app.use('/dados',require('./dados'))
}