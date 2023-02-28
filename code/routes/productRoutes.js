/**
 * Arquivo que comtem as todas relacionadas aos produtos
 */

const express = require('express')
const router = express.Router()

const ProductController = require("../controllers/ProductController")

// Rotas Frontend
router.get('/insert', ProductController.insertProduct)
router.post('/find', ProductController.findProductPost)
router.get('/', ProductController.home)

// Rotas Backend
router.get('/list', ProductController.listProducts)
router.get('/:id', ProductController.findProductByID)
router.post('/add', ProductController.createProduct)
router.post('/edit/:id', ProductController.updateProduct)
router.get('/delete/:id', ProductController.deleteProduct)

module.exports = router