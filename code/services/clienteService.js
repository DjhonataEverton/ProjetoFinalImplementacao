const conn = require('../connection')

module.exports = {
    cadastrarCliente: (cpf_cnpj, name, email, password) => {
        return new Promise((aceito,rejeitado) => {
            
            conn.query('INSERT INTO tb_client (cpf_cnpj, name, email, password) values (?,?,?,?)', [cpf_cnpj, name, email, password], (error, results) => {

                if (error) {rejeitado(error); return}
                aceito(results)

            })
        })
    }
}