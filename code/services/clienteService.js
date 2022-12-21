const conn = require('../connection')

class clienteService {

    async cadastrarCliente (cpf_cnpj, name, email, password){
        const sql = 'INSERT INTO tb_client (cpf_cnpj, name, email, password) values (?,?,?,?)'
        const values = [cpf_cnpj, name, email, password]
        try{
            const res = conn.query(sql, values)
            return res
        }catch(error){
            console.log(error)
        }
    }
    async listarCliente () {
        const sql = 'SELECT * FROM tb_client'
        try {
            const res = conn.query(sql)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new clienteService()