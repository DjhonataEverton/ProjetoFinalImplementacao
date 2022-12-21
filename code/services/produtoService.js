const conn = require('../connection');

class produtosService {
    async listarProdutos () {
        const sql = 'SELECT * FROM tb_products'
        try {
            conn.query(sql)
        } catch (error) {
            console.log(error)
        }
    }
    async listarProduto (id_products) {
        
        const sql = 'SELECT * FROM tb_products WHERE id_products = ?'
        const values = [id_products]
        try {
            conn.query(sql,values)
        } catch (error) {
            console.log(error)
        }
            
    }
    async cadastrarProduto (product, price, unity){
        const sql = 'INSERT INTO tb_products (product, price, unity) VALUES (?, ?, ?)'
        const values = [product, price, unity]
        try {
            conn.query(sql,values)
        } catch (error) {
            console.log(error)
        }
    }
    async alterarProduto (id_products, product, price, unity) {
        const sql = 'UPDATE tb_products SET product = ?, price = ?, unity = ? WHERE id_products = ?'
        const values = [product, price, unity, id_products]
        try {
            conn.query(sql,values)
        } catch (error) {
            console.log(error)
        }
    }
    async excluirProduto (id_products){
        const sql = 'DELETE FROM tb_products WHERE id_products = ?'
        const values = [id_products]
        try {
            conn.query(sql,values)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new produtosService()