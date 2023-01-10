const prisma = require("@prisma/client")
const orderModel = require("../models/orderModel")

class productController {
    async listOrders() {
        const list = orderModel.list_orders()
        return await list
    }
    async createOrder(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT) {
        const create = orderModel.create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return await create
    }
    async findOrderById(ID) {
        const find = orderModel.find_order(ID)
        return await find
    }
    async updateOrder(ID, PRODUCT, QUANTITY, ACCEPT, ID_CLIENT) {
        const update = orderModel.update_order(ID, PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return await update
    }
    async deleteOrder(ID) {
        const deleteO = orderModel.delete_order(ID)
        return await deleteO
    }
}

let produto = new productController()

