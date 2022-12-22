const conn = require('../connection')

module.exports = class clienteService {

    async cadastrarCliente (cpf_cnpj, name, email, password){
        const sql = 'INSERT INTO tb_client (cpf_cnpj, name, email, password) values (?,?,?,?)'
        const values = [cpf_cnpj, name, email, password]
        try{
            const res = await conn.query(sql, values)
            return res
        }catch(error){
            console.log(error)
        }
    }
    async listarClientes () {
        const sql = 'SELECT * FROM tb_client'
        try {
            const res = await conn.query(sql)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}