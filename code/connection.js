require('dotenv').config({path:'variaveis.env'})
const conn = require('mysql');

/*async function connection(){
    const conexao = conn.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.PORT
    });

    conexao.connect((error) => {
        if(error) throw error;
        console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`)
    });
    module.exports = connection
}*/

/*
    const conexao = conn.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.PORT
    });

    conexao.connect((error) => {
        if(error) throw error;
        console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`)
    });

module.exports = conexao
*/

async function connection(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.port
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = connection
