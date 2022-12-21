const conn = require('../connection');

module.exports = {
    listarProdutos: () => {
        return new Promise((aceito, rejeitado) => {

            conn.query('SELECT * FROM tb_products', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    listarProduto: (id_products) => {
        return new Promise((aceito, rejeitado) => {

            conn.query('SELECT * FROM tb_products WHERE id_products = ?', [id_products], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    cadastrarProduto: (product, price, unity) => {
        return new Promise((aceito, rejeitado) => {

            conn.query('INSERT INTO tb_products (product, price, unity) VALUES (?, ?, ?)',
                [product, price, unity],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },

    alterarProduto: (id_products, product, price, unity) => {
        return new Promise((aceito, rejeitado) => {

            conn.query('UPDATE tb_products SET product = ?, price = ?, unity = ? WHERE id_products = ?',
                [product, price, unity, id_products],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluirProduto: (id_products) => {
        return new Promise((aceito, rejeitado) => {

            conn.query('DELETE FROM tb_products WHERE id_products = ?', [id_products], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};
