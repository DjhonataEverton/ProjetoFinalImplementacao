const clienteService = require('../services/clienteService')
//import listarClientes from "../services/clienteService";

class clienteController {
    async listarClientes (req, res){

        const json = { error: '', result: [] };
        try {
            const clientes = await clienteService.listarClientes;
            console.log(clientes)
            for (let i in clientes) {
                json.result.push({
                    id_client: id_client[i],
                    CPF_CNPJ: cpf_cnpj[i],
                    NOME: name[i],
                    EMAIL: email[i],
                    SENHA: password[i]
                });
            }
            res.json(json)
        } catch (error) {
            console.log(error)
        }
        
    }
    async cadastrarClientes (req,res){
        let json = {error: '', result: {}}

        let cpf_cnpj = req.body.cpf_cnpj
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password


    }
}
/*async function listarClientes (req, res){

    let json = { error: '', result: [] };

    const clientes = await clienteService.listarClientes;
    
    for (let i in clientes) {
        json.result.push({
            id_client: clientes[i].id_client,
            CPF_CNPJ: clientes[i].cpf_cnpj,
            NOME: clientes[i].name,
            EMAIL: clientes[i].email,
            SENHA: clientes[i].password
        });
    }
    res.json(json)
}
*/

module.exports = new clienteController()