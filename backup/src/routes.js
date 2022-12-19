const express = require('express');
const router = express.Router();

const EncomendaController = require('./controllers/EncomendaController');

router.get('/encomendas', EncomendaController.buscarTodos);
router.get('/encomendas/:codigo', EncomendaController.buscarUm);
router.post('/encomendas', EncomendaController.inserir);
router.put('/encomendas/:codigo', EncomendaController.alterar);
router.delete('/encomendas/:codigo', EncomendaController.excluir);

module.exports = router;