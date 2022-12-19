const EncomendaService = require('../services/EncomendaService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let encomendas = await EncomendaService.buscarTodos();

        for (let i in encomendas) {
            json.result.push({
                codigo: encomendas[i].codigo,
                data_de_entrega: encomendas[i].data_de_entrega,
                produto: encomendas[i].produto,
                quantidade: encomendas[i].quantidade, 
                cliente: encomendas[i].cliente 
            });
        }

        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.codigo;
        let encomenda = await EncomendaService.buscarUm(codigo);

        if (encomenda) {
            json.result = encomenda;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let data_de_entrega = req.body.data_de_entrega;
        let produto = req.body.produto;
        let quantidade = req.body.quantidade;
        let cliente = req.body.cliente;

        if (data_de_entrega && produto && quantidade && cliente) {
            let EncomendaCodigo = await EncomendaService.inserir(data_de_entrega, produto, quantidade, cliente);
            json.result = {
                codigo: EncomendaCodigo,
                data_de_entrega,
                produto,
                quantidade,
                cliente
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };
        
        let codigo = req.params.codigo;
        let data_de_entrega = req.body.data_de_entrega;
        let produto = req.body.produto;
        let quantidade = req.body.quantidade;
        let cliente = req.body.cliente;

        if (codigo && data_de_entrega && produto && quantidade && cliente) {
            let EncomendaCodigo = await EncomendaService.alterar(codigo, data_de_entrega, produto, quantidade, cliente);
            json.result = {
                codigo,
                data_de_entrega,
                produto,
                quantidade,
                cliente
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        await EncomendaService.excluir(req.params.codigo);

        res.json(json);
    }
}