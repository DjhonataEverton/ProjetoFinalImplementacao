const express = require('express')
const router = express.Router()

const comissionaireController = require("../controllers/comissionaireController")

router.get('/', comissionaireController.listComissionaires)
router.get('/:cpf', comissionaireController.findComissionaireByCPF)
router.post('/add', comissionaireController.createComissionaire)
router.put('/:id', comissionaireController.updateComissionaire)
router.delete('/:cpf', comissionaireController.deleteComissionaire)

module.exports = router

