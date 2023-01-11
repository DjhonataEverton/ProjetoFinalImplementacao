const express = require('express')
const router = express.Router()

const clientController = require("../controllers/clientController")

router.get('/', clientController.listClients)
router.get('/:cpf', clientController.findByCPF)
router.post('/add', clientController.createClient)
router.delete('/:cpf', clientController.deleteByCpf)
router.put('/:cpf', clientController.updateByCpf)

module.exports = router

