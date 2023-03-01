/**
 * Arquivo que comtem as todas relacionadas aos clientes
 */

const express = require('express')
const router = express.Router()

const ClientController = require("../controllers/ClientController")

// Rotas frontend
router.get('/login', ClientController.login)
router.get('/edit', ClientController.editPage)
router.get('/register', ClientController.register)
router.get('/dashboard', ClientController.dashboard)
router.get('/fazerpedido', ClientController.fazerPedido)
router.post('/find', ClientController.findClientePost)
router.get('/', ClientController.home)

// Rotas backend
router.get('/logout', ClientController.logout)
router.get('/list', ClientController.listClients)
router.get('/:cpf', ClientController.findByCPF)
router.post('/add', ClientController.createClient)
router.post('/edit/:cpf', ClientController.updateByCpf)
router.get('/delete/:cpf', ClientController.deleteByCpf)
router.post('/auth', ClientController.authenticate)

module.exports = router