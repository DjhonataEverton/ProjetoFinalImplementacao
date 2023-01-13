const prisma = require("@prisma/client")
const orderModel = require("../models/orderModel")

class orderController {
    async listOrders(req, res) {

        if(!req.session.comissionaireIn){
            return res.send('Acesso Restrito')
        }

        const result = await orderModel.list_orders()
        return res.json(result)
    }

    async createOrder(req, res) {
        if(!req.session.loggedin){
            return res.send('Usuário nao logado!')
        }

        console.log(req.session)

        const PRODUCT = req.body.product
        const QUANTITY = req.body.quantity
        const ACCEPT = 'N'
        const ID_CLIENT = req.session.clientId

        if(!PRODUCT || !QUANTITY ){
            return res.send('Preencha todos os campos.')
        }

        const result = await orderModel.create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT)
        return res.json(result)
    }

    async findOrderById(req, res) {
        if(!req.session.loggedin){
            return res.send('Usuário não logado')
        }

        const ID = parseInt(req.params.id)
        
        const result = await orderModel.find_order(ID)

        if(result === null){
            return res.status(404).send('Order não existente')
        }

        if(result.id_client != req.session.clientId){
            return res.send('Cada cliente só pode ver seus próprios pedidos')
        }

        return res.json(result)
    }

    async deleteOrder(req, res) {

        console.log(req.session)

        if(!req.session.clientId){
            return res.send('Usuário não logado.')
        }

        const ID = parseInt(req.params.id)
        const result = await orderModel.find_order(ID)

        if(result === null){
            return res.send('Order não existente.')
        }
        
        if(result.id_client != req.session.clientId){
            return res.send('Cada cliente só pode remover apenas seus próprios pedidos.')
        }

        await orderModel.delete_order(ID)
        return res.send(`Order de ID '${ID}' deletada.`)
    }
}

module.exports = new orderController()