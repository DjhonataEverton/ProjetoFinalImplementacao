require('dotenv').config({path:'variaveis.env'})
const express = require('express')
const app = express()

const PORT = process.env.PORT
app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res)=> {
    res.render('../views/home')
})

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})