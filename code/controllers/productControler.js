const prisma = require("@prisma/client")
const productModel = require("../models/productModel")

class productController {
    async listProducts() {
        const list = productModel.list_products()
        return await list
    }
    async createProduct(PRODUCT, PRICE, UNITY) {
        const create = productModel.create_product(PRODUCT, PRICE, UNITY)
        return await create
    }
    async findProductByID(ID) {
        const find = productModel.find_product(ID)
        return await find
    }
    async updateProduct(ID, PRODUCT, PRICE, UNITY) {
        const update = productModel.update_product(ID, PRODUCT, PRICE, UNITY)
        return await update
    }
    async deleteProduct(ID) {
        const deleteP = productModel.delete_product(ID)
        return await deleteP
    }
}

let produto = new productController()

