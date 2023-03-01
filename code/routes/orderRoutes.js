/**
 * Arquivo que contem as todas relacionadas aos pedidos
 */

const express = require('express')
const router = express.Router()

const OrderController = require("../controllers/OrderController")

// Rotas frontend
router.post('/find', OrderController.findOrderPost)
router.get('/', OrderController.home)

// Rotas backend
router.get('/list', OrderController.listOrders)
router.get('/myOrders', OrderController.listOrdersByUserId)
router.get('/:id', OrderController.findOrderById)
router.post('/add', OrderController.createOrder)
router.get('/approve/:id', OrderController.aproveOrder)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router