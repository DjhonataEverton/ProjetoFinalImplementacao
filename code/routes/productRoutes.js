/**
 * Arquivo que comtem as todas relacionadas aos produtos
 */

const express = require('express')
const router = express.Router()

const ProductController = require("../controllers/ProductController")

router.get('/', ProductController.listProducts)
router.get('/:id', ProductController.findProductByID)
router.post('/add', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router