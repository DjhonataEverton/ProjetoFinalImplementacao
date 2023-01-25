const productModel = require("../models/productModel")

/**
 * @class classe responsável por guardar os metodos de tratamento das requisições e respostas dos produtos
 */

class productController {
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com todos os produtos que estão no banco de dados
   */
    async listProducts(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const result = await productModel.list_products()
        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um jsom com o produto cadastado
   */
    async createProduct(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Accesso Restrito')
        }

        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity
        
        
        if (!PRODUCT || !PRICE || !UNITY) {
            return res.status(400).send('Preencha todos os campos.')
        }

        if(UNITY != 'kg' && UNITY != 'l'){
            return res.status(400).send('A unidade deve ser `kg` ou `l`!')
        }

        if (typeof PRICE != 'number') {
            return res.status(400).send('O preço precisa ser um número.')
        }

        const result = await productModel.create_product(PRODUCT, PRICE, UNITY)
        return res.status(201).json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com o produto que está relacionado ao ID inserido
   */
    async findProductByID(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const result = await productModel.find_product(ID)
        if (result === null) {
            return res.status(404).send('Produto não encontrado.')
        }

        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com o produto atualizado
   */
    async updateProduct(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const ID = parseInt(req.params.id)
        const PRODUCT = req.body.product
        const PRICE = req.body.price
        const UNITY = req.body.unity

        if (!PRODUCT || !PRICE || !UNITY) {
            return res.status(400).send('Preencha todos os campos.')
        }

        if(UNITY != 'kg' && UNITY != 'l'){
            return res.status(400).send('A unidade deve ser `kg` ou `l`!')
        }

        if (typeof PRICE != 'number') {
            return res.status(400).send('O preço precisa ser um número.')
        }

        const find = await productModel.find_product(ID)
        if (find === null) {
            return res.status(404).send('Produto não encontrado.')
        }

        const result = await productModel.update_product(ID, PRODUCT, PRICE, UNITY)
        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a confirmação de que foi deletado o produto relacionado ao ID inseridos
   */
    async deleteProduct(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const result = await productModel.find_product(ID)
        if (result === null) {
            return res.status(404).send('Produto não encontrado.')
        }

        await productModel.delete_product(ID)
        return res.send(`Produto de ID '${ID}' deletado.`)
    }
}

module.exports = new productController()

