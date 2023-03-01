const orderModel = require("../models/orderModel")

/**
 * @class classe responsável por guardar os metodos de tratamento das requisições e respostas dos pedidos
 */
class orderController {
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com todos os dados vindos do banco de dados 
   */
    async listOrders(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const result = await orderModel.list_orders()
        return res.render('ordersList', { result: result })
    }

    async listOrdersByUserId(req, res) {
        if (!req.session.clientId) {
            return res.status(401).send('Usuário não logado!')
        }

        const result = await orderModel.list_orders_by_client_id(req.session.clientId)
        return res.render('meusPedidos', { result: result })
    }

    async createOrder(req, res) {
        if (!req.session.clientId) {
            return res.status(401).send('Usuário nao logado!')
        }

        const PRODUCT = req.body.product
        const QUANTITY = Number(req.body.quantity)
        const ACCEPT = 'N'
        const ID_CLIENT = req.session.clientId

        if (!PRODUCT || !QUANTITY) {
            return res.status(400).send('Preencha todos os campos.')
        }

        if (typeof QUANTITY != "number") {
            return res.status(400).send('A quantidade deve ser um número.')
        }

        const result = await orderModel.create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return res.redirect('/clientes/dashboard')
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com o pedido relacionado ao ID inserido
   */
    async findOrderById(req, res) {
        if (!req.session.clientId && !req.session.comissionaireId) {
            return res.status(401).send('Usuário nao logado!')
        }

        const ID = parseInt(req.params.id)

        const result = await orderModel.find_order(ID)

        if (result === null) {
            return res.status(404).send('Order não existente')
        }

        if (result.id_client != req.session.clientId && !req.session.comissionaireId) {
            return res.send('Cada cliente só pode ver seus próprios pedidos')
        }

        return res.render('orderView', { result: result })
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a confirmação de que foi deletado se o id que foi inserido está no banco de dados
   */
    async deleteOrder(req, res) {
        if (!req.session.clientId) {
            return res.status(401).send('Usuário nao logado!')
        }

        const ID = parseInt(req.params.id)
        const result = await orderModel.find_order(ID)

        if (result === null) {
            return res.status(404).send('Order não existente.')
        }

        if (result.id_client != req.session.clientId) {
            return res.send('Cada cliente só pode remover apenas seus próprios pedidos.')
        }

        if(result.accept == 'S'){
            return res.send('Não é possível remover pedidos aceitos.')
        } 

        await orderModel.delete_order(ID)
        return res.redirect('/orders/myOrders')
    }

    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @return vai retornar o resultado da aprovação ou não do pedido
   */
    async aproveOrder(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const find = await orderModel.find_order(ID)
        if (find === null) {
            return res.status(404).send('Order não existente.')
        }

        let ACCEPT = find.accept
        ACCEPT == 'N' ? ACCEPT = 'S' : ACCEPT = 'N'

        await orderModel.approve(ID, ACCEPT)
        res.redirect('/orders/list')
    }


    // Rotas Front
    home(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }

        res.render('ordersHome')
        return
    }

    async findOrderPost(req, res){
        if (!req.session.comissionaireId) {
            return res.status(401).send('Acesso Restrito')
        }
        
        const id = parseInt(req.body.id)
        const result = await orderModel.find_order(id)

        if(result == null){
            res.redirect('/404')
            return
        }

        res.redirect(`/orders/${result.id_order}`)
        return
    }
}

module.exports = new orderController()