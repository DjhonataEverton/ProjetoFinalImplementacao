const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.listarClientes);
//router.get('/encomendas/:codigo', clienteController.buscarUm);
//router.post('/encomendas', clienteController.inserir);
//router.put('/encomendas/:codigo', clienteController.alterar);
//router.delete('/encomendas/:codigo', clienteController.excluir);

module.exports = router; 