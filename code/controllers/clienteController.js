const clienteService = require('../services/clienteService')

class clienteController {
    async listarClientes (req, res){

        let json = { error: '', result: [] };

        let clientes = await clienteService.listarClientes;

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
}

module.exports = new clienteController()