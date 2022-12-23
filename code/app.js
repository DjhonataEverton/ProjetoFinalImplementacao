require('dotenv').config({path:'variaveis.env'})
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3000
app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))
const routes = require('../code/routes/routes');

app.use(bodyParser.json())
//app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.json)

app.get('/', (req,res)=> {
    res.render('../views/home')
})

app.use('/api', routes);

app.listen(3000, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})