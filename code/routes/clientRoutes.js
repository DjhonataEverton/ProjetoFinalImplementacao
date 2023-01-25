/**
 * Arquivo que comtem as todas relacionadas aos clientes
 */

const express = require('express')
const router = express.Router()

const ClientController = require("../controllers/ClientController")

router.get('/', ClientController.listClients)
router.get('/:cpf', ClientController.findByCPF)
router.post('/add', ClientController.createClient)
router.put('/:cpf', ClientController.updateByCpf)
router.delete('/:cpf', ClientController.deleteByCpf)
router.post('/auth', ClientController.authenticate)

module.exports = router