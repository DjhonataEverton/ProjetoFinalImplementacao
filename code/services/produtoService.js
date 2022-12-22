const conn = require('../connection');

class produtosService {
    async listarProdutos () {
        const sql = 'SELECT * FROM tb_products'
        try {
            let res = await conn.query(sql)
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async listarProduto (id_products) {
        
        const sql = 'SELECT * FROM tb_products WHERE id_products = ?'
        const values = [id_products]
        try {
            const res = await conn.query(sql,values)
            return res
        } catch (error) {
            console.log(error)
        }
            
    }
    async cadastrarProduto (product, price, unity){
        const sql = 'INSERT INTO tb_products (product, price, unity) VALUES (?, ?, ?)'
        const values = [product, price, unity]
        try {
            const res = await conn.query(sql,values)
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async alterarProduto (id_products, product, price, unity) {
        const sql = 'UPDATE tb_products SET product = ?, price = ?, unity = ? WHERE id_products = ?'
        const values = [product, price, unity, id_products]
        try {
            const res = await conn.query(sql,values)
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async excluirProduto (id_products){
        const sql = 'DELETE FROM tb_products WHERE id_products = ?'
        const values = [id_products]
        try {
            const res = await conn.query(sql,values)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new produtosService()