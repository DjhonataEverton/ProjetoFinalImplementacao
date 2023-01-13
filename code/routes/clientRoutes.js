/**
 * Arquivo que comtem as todas relacionadas aos clientes
 */

const express = require('express')
const router = express.Router()
const path = require("path")

const clientController = require("../controllers/clientController")

router.get('/', clientController.listClients)
router.get('/:cpf', clientController.findByCPF)
router.post('/add', clientController.createClient)
router.put('/:cpf', clientController.updateByCpf)
router.delete('/:cpf', clientController.deleteByCpf)
router.post('/auth', clientController.authenticate)

module.exports = router

