const express = require('express')
const router = express.Router()

const clientController = require("../controllers/clientController")

router.get('/', clientController.listClients)
router.get('/:cpf', clientController.findByCPF)
router.post('/add', clientController.createClient)
router.put('/:cpf', clientController.updateByCpf)
router.delete('/:cpf', clientController.deleteByCpf)

module.exports = router

