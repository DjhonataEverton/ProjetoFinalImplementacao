const prisma = require("@prisma/client")
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
        if (!req.session.comissionaireIn) {
            return res.send('Acesso Restrito')
        }

        const result = await orderModel.list_orders()
        return res.json(result)
    }

    async createOrder(req, res) {
        if (!req.session.loggedin) {
            return res.send('Usuário nao logado!')
        }

        const PRODUCT = req.body.product
        const QUANTITY = req.body.quantity
        const ACCEPT = 'N'
        const ID_CLIENT = req.session.clientId

        if (!PRODUCT || !QUANTITY) {
            return res.send('Preencha todos os campos.')
        }

        const result = await orderModel.create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com o pedido relacionado ao ID inserido
   */
    async findOrderById(req, res) {
        if (!req.session.loggedin || !req.session.comissionaireIn) {
            return res.send('Usuário não logado')
        }

        const ID = parseInt(req.params.id)

        const result = await orderModel.find_order(ID)

        if (result === null) {
            return res.status(404).send('Order não existente')
        }

        if (result.id_client != req.session.clientId) {
            return res.send('Cada cliente só pode ver seus próprios pedidos')
        }

        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a confirmação de que foi deletado se o id que foi inserido está no banco de dados
   */
    async deleteOrder(req, res) {
        if (!req.session.clientId) {
            return res.send('Usuário não logado.')
        }

        const ID = parseInt(req.params.id)
        const result = await orderModel.find_order(ID)

        if (result === null) {
            return res.send('Order não existente.')
        }

        if (result.id_client != req.session.clientId) {
            return res.send('Cada cliente só pode remover apenas seus próprios pedidos.')
        }

        await orderModel.delete_order(ID)
        return res.send(`Order de ID '${ID}' deletada.`)
    }

    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @return vai retornar o resultado da aprovação ou não do pedido
   */
    async aproveOrder(req, res) {
        if (!req.session.comissionaireIn) {
            return res.send('Acesso Restrito')
        }

        const ID = parseInt(req.params.id)

        const find = await orderModel.find_order(ID)
        if (find === null) {
            return res.send('Order não existente.')
        }

        let ACCEPT = find.accept
        ACCEPT == 'N' ? ACCEPT = 'S' : ACCEPT = 'N'

        const result = await orderModel.approve(ID, ACCEPT)
        res.send(result)
    }
}

module.exports = new orderController()