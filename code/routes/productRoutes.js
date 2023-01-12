const express = require('express')
const router = express.Router()

const produtoController = require("../controllers/productController")

router.get('/', produtoController.listProducts)
router.get('/:id', produtoController.findProductByID)
router.post('/add', produtoController.createProduct)
router.put('/:id', produtoController.updateProduct)
router.delete('/:id', produtoController.deleteProduct)

module.exports = router

