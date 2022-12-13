require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./src/routes');
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado em: http://localhost:${PORT}`);
});