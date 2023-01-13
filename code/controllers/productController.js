const prisma = require("@prisma/client")
const productModel = require("../models/productModel")

class productController {
    async listProducts(req, res) {
        if(!req.session.comissionaireIn){
            return res.send('Accesso Restrito')
        }

        const result = await productModel.list_products()
        return res.json(result)
    }
    async createProduct(req, res) {
        if(!req.session.comissionaireIn){
            return res.send('Accesso Restrito')
        }

        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity

        if(!PRODUCT || !PRICE || !UNITY){
            return res.send('Preencha todos os campos.')
        }

        if(typeof PRICE != 'number'){
            return res.send('O preço precisa ser um número.')
        }

        const result = await productModel.create_product(PRODUCT, PRICE, UNITY)
        return res.json(result)
    }
    async findProductByID(req, res) {
        if(!req.session.comissionaireIn){
            return res.send('Accesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const find = await productModel.find_product(ID)
        if(find === null){
            return res.status(404).send('Produto não encontrado.')
        }

        return res.json(find)
    }
    async updateProduct(req, res) {
        if(!req.session.comissionaireIn){
            return res.send('Accesso Restrito')
        }

        const ID = parseInt(req.params.id)
        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity

        if(!PRODUCT || !PRICE || !UNITY){
            return res.send('Preencha todos os campos.')
        }

        if(typeof PRICE != 'number'){
            return res.send('O preço precisa ser um número.')
        }
        
        const find = await productModel.find_product(ID)
        if(find === null){
            return res.send('Produto não encontrado.')
        }

        const result = await productModel.update_product(ID, PRODUCT, PRICE, UNITY)
        return res.json(result)
    }
    async deleteProduct(req, res) {
        if(!req.session.comissionaireIn){
            return res.send('Accesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const result = await productModel.find_product(ID)
        if(result === null){
            return res.send('Produto não encontrado.')
        }

        await productModel.delete_product(ID)
        return res.send(`Produto de ID '${ID}' deletado.`)
    }
}

module.exports = new productController()

