const produtoService = require('../services/produtoService');

module.exports = {
    listarProdutos: async (req, res) => {
        let json = { error: '', result: [] };

        let produtos = await produtoService.listarProdutos();

        for (let i in produtos) {
            json.result.push({
                id_products: produtos[i].id_products,
                product: produtos[i].product,
                price: produtos[i].price, 
                unity: produtos[i].unity 
            });
        }

        res.json(json);
    },

    listarProduto: async (req, res) => {
        let json = { error: '', result: {} };

        let id_products = req.params.id_products;
        let produto = await produtoService.listarProduto(id_products);

        if (produto) {
            json.result = produto;
        }

        res.json(json);
    },

    cadastrarProduto: async (req, res) => {
        let json = { error: '', result: {} };

        let product = req.body.product;
        let unity = req.body.unity;
        let price = req.body.price;

        if (product && unity && price) {
            let ProdutoCodigo = await produtoService.cadastrarProduto(product, price, unity);
            json.result = {
                id_products: ProdutoCodigo,
                product,
                price,
                unity
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterarProduto: async (req, res) => {
        let json = { error: '', result: {} };
        
        let id_products = req.params.id_products;
        let product = req.body.product;
        let unity = req.body.unity;
        let price = req.body.price;

        if (id_products && product && unity && price) {
            let ProdutoCodigo = await produtoService.alterarProduto(id_products, product, price, unity);
            json.result = {
                id_products,
                product,
                price,
                unity
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluirProduto: async (req, res) => {
        let json = { error: '', result: {} };

        await produtoService.excluirProduto(req.params.id_products);

        res.json(json);
    }
}