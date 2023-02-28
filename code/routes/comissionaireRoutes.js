/**
 * Arquivo que comtem as todas relacionadas aos funcionarios
 */

const express = require('express')
const router = express.Router()

const ComissionaireController = require("../controllers/ComissionaireController")

// Rotas frontend
router.get('/login', ComissionaireController.login)
router.get('/dashboard', ComissionaireController.dashboard)
router.get('/logout', ComissionaireController.logout)

// Rotas backend
router.get('/', ComissionaireController.listComissionaires)
router.get('/:cpf', ComissionaireController.findComissionaireByCPF)
router.post('/add', ComissionaireController.createComissionaire)
router.put('/:id', ComissionaireController.updateComissionaire)
router.delete('/:cpf', ComissionaireController.deleteComissionaire)
router.post('/auth', ComissionaireController.authenticate)

module.exports = router