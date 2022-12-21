const conn = require('../connection')

class comissionarioService {
    async cadastrarComissionario(cpf, name, email, password) {
        const sql = "INSERT INTO tb_commissionare (cpf, name, email, password) values (?,?,?,?)";
        const values = [cpf, name, email, password];
        try{
           const res = await conn.query(sql,values)
           return res;
        }catch(error){
            console.log(error)
        }
    }
    async deletarComissionario (cpf) {
        const sql = "DELETE * FROM tb_commissionare where cpf = ?";
        const values = [cpf];
        try{
            const res = await conn.query(sql,values)
            return res;
         }catch(error){
             console.log(error)
         }
    }
    async listarComissionarios () {
        const sql = "SELECT * FROM tb_commissionare"
        try{
            const res = await conn.query(sql)
            return res
        }catch{
            console.log(error)
        }
    }
}

module.exports = new comissionarioService();
