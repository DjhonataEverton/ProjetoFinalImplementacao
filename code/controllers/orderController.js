const prisma = require("@prisma/client")
const orderModel = require("../models/orderModel")

class orderController {
    async listOrders(req, res) {

        const list = await orderModel.list_orders()
        return res.json(list)
    }

    async createOrder(req, res) {
        const PRODUCT = req.body.product
        const QUANTITY = req.body.quantity
        const ACCEPT = req.body.accept
        const ID_CLIENT = req.body.id_client

        const create = await orderModel.create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return res.json(create)
    }

    async findOrderById(req, res) {
        const ID = parseInt(req.params.id)

        const find = await orderModel.find_order(ID)

        if(find === null){
            return res.status(404).send('Order não encontrada')
        }
        return res.json(find)
    }

    async updateOrder(req, res) {
        const ID = parseInt(req.params.id)
        const PRODUCT = req.body.product
        const QUANTITY = req.body.quantity
        const ACCEPT = req.body.accept
        const ID_CLIENT = req.body.id_client

        const update = await orderModel.update_order(ID, PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return res.json(update)
    }

    async deleteOrder(req, res) {
        const ID = parseInt(req.params.id)

        await orderModel.delete_order(ID)
        return res.send(`Order de ID '${ID}' deletada.`)
    }
}

module.exports = new orderController()