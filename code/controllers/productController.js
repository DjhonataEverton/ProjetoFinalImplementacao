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
        return res.render('productsList', { result: result })
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

        const {product, unity} = req.body
        const price = Number(req.body.price)


        if (!product || !price || !unity) {
            return res.status(400).send('Preencha todos os campos.')
        }

        if (unity != 'kg' && unity != 'l') {
            return res.status(400).send('A unidade deve ser `kg` ou `l`!')
        }

        if (typeof price != 'number') {
            return res.status(400).send('O preço precisa ser um número.')
        }

        await productModel.create_product(product, price, unity)

        res.redirect('/produtos')
        return
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

        res.render('viewProduct', {product: result})
        return
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

        const id = parseInt(req.params.id)
        const {product, unity} = req.body
        const price = Number(req.body.price)

        if (!product || !price || !unity) {
            return res.status(400).send('Preencha todos os campos.')
        }

        if (unity != 'kg' && unity != 'l') {
            return res.status(400).send('A unidade deve ser `kg` ou `l`!')
        }

        if (typeof price != 'number') {
            return res.status(400).send('O preço precisa ser um número.')
        }

        const find = await productModel.find_product(id)
        if (find === null) {
            return res.status(404).send('Produto não encontrado.')
        }

        await productModel.update_product(id, product, price, unity)

        res.redirect('/produtos')
        return
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

        res.redirect('/produtos')
        return
    }

    // Front
    home(req, res){
        if(!req.session.comissionaireId){
            res.status(401).send('Acesso Restrito')
            return
        }

        res.render('productsHome')
        return
    }

    insertProduct(req, res){
        if(!req.session.comissionaireId){
            res.status(401).send('Acesso Restrito')
            return
        }

        res.render('createProduct')
        return
    }

    async findProductPost(req, res){
        if(!req.session.comissionaireId){
            res.status(401).send('Acesso Restrito')
            return
        }

        const id = parseInt(req.body.id)
        const result = await productModel.find_product(id)
        if (result === null) {
            return res.redirect('/404')
        }

        res.redirect(`/produtos/${result.id_products}`)
        return
    }

}

module.exports = new productController()

