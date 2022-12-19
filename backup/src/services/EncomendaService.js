const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM encomendas', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM encomendas WHERE codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (data_de_entrega, produto, quantidade, cliente) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO encomendas (data_de_entrega, produto, quantidade, cliente) VALUES (?, ?, ?, ?)',
                [data_de_entrega, produto, quantidade, cliente],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    alterar: (codigo, data_de_entrega, produto, quantidade, cliente) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE encomendas SET data_de_entrega = ?, produto = ?, quantidade = ?, cliente = ? WHERE codigo = ?',
                [data_de_entrega, produto, quantidade, cliente, codigo],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (codigo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM encomendas WHERE codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};
