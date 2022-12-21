const clienteService = require('../services/clienteService')

module.exports = {
    listarClientes: async (req, res) => {
        let json = { error: '', result: [] };

        let clientes = await clienteService.listarClientes();

        for (let i in clientes) {
            json.result.push({
                id_client: id_client[i],
                CPF_CNPJ: cpf_cnpj[i],
                NOME: name[i],
                EMAIL: email[i],
                SENHA: password[i]
            });
        }
        res.json(json);
    },
}