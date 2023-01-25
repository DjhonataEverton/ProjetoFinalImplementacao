/**
 * Arquivo que comtem as todas relacionadas aos pedidos
 */

const express = require('express')
const router = express.Router()

const OrderController = require("../controllers/OrderController")

router.get('/', OrderController.listOrders)
router.get('/:id', OrderController.findOrderById)
router.post('/add', OrderController.createOrder)
router.post('/approve/:id', OrderController.aproveOrder)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router