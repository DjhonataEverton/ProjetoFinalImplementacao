const prisma = require("@prisma/client")
const productModel = require("../models/productModel")

class productController {
    async listProducts(req, res) {
        const list = await productModel.list_products()
        return res.json(list)
    }
    async createProduct(req, res) {
        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity

        const create = await productModel.create_product(PRODUCT, PRICE, UNITY)
        return res.json(create)
    }
    async findProductByID(req, res) {
        const ID = parseInt(req.params.id)

        const find = await productModel.find_product(ID)
        if(find === null){
            return res.status(404).send('Produto não encontrado.')
        }

        return res.json(find)
    }
    async updateProduct(req, res) {
        const ID = parseInt(req.params.id)
        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity
        
        const update = await productModel.update_product(ID, PRODUCT, PRICE, UNITY)
        return res.json(update)
    }
    async deleteProduct(req, res) {
        const ID = parseInt(req.params.id)
        
        await productModel.delete_product(ID)
        return res.send(`Produto de ID '${ID}' deletado.`)
    }
}

module.exports = new productController()

