require('dotenv').config({path:'variaveis.env'})
const express = require('express')
const app = express()

const PORT = (process.env.PORT || 3000)
app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))
const routes = require('../code/routes/routes');

app.get('/', (req,res)=> {
    res.render('../views/home')
})

app.use('/api', routes);

app.listen(3000, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})