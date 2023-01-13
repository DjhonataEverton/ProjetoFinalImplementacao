/**
 * Arquivo que comtem as todas relacionadas aos pedidos
 */
const express = require('express')
const router = express.Router()

const orderController = require("../controllers/orderController")

router.get('/', orderController.listOrders)
router.get('/:id', orderController.findOrderById)
router.post('/add', orderController.createOrder)
router.post('/approve/:id', orderController.aproveOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router

