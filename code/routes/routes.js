const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const produtoController = require('../controllers/produtoController');

router.get('/clientes', clienteController.listarClientes);
//router.get('/encomendas/:codigo', clienteController.buscarUm);
//router.post('/encomendas', clienteController.inserir);
//router.put('/encomendas/:codigo', clienteController.alterar);
//router.delete('/encomendas/:codigo', clienteController.excluir);

router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:id_products', produtoController.listarProduto);
router.post('/produtos', produtoController.cadastrarProduto);
router.put('/produtos/:id_products', produtoController.alterarProduto);
router.delete('/produtos/:id_products', produtoController.excluirProduto);

module.exports = router; 