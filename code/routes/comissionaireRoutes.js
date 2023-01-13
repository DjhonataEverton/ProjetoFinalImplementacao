/**
 * Arquivo que comtem as todas relacionadas aos funcionarios
 */
const express = require('express')
const router = express.Router()

const comissionaireController = require("../controllers/comissionaireController")

router.get('/', comissionaireController.listComissionaires)
router.get('/:cpf', comissionaireController.findComissionaireByCPF)
router.post('/add', comissionaireController.createComissionaire)
router.put('/:id', comissionaireController.updateComissionaire)
router.delete('/:cpf', comissionaireController.deleteComissionaire)
router.post('/auth', comissionaireController.authenticate)

module.exports = router

