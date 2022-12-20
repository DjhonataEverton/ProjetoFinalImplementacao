require('dotenv').config({path:'variaveis.env'})
const conn = require('mysql');

const connection = conn.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.port
});

connection.connect((error) => {
    if(error) throw error;
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`)
});

module.exports = connection;