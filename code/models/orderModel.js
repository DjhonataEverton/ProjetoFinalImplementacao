// model tb_order {
//     id_order  Int      @id @default(autoincrement())
//     product   String   @db.VarChar(45)
//     quantity  Int      
//     time      DateTime @db.DateTime()
//     accept    String   @db.Char(1)
//     id_Client tb_client? @relation(fields: [id_client], references: [id_client])
//     id_client Int
//   }

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
/**
 * @class classe responsável por guardar os metodos dos modelos de acesso ao banco de dados dos pedidos
 */

class orderModel {
    /**
     * 
     * @returns retorna em uma variável todos os pedidos que existem no banco de dados
     */
    async list_orders() {
        await prisma.$connect
        const allOrders = await prisma.tb_order.findMany()
        await prisma.$disconnect

        return allOrders
    }
    /**
     * 
     * @param {Int} ID recebe o ID do pedido que deseja encontrar
     * @returns retorna o metodo de encontrar pelo ID
     */
    async find_order(ID) {
        prisma.$connect
        const findOrder = await prisma.tb_order.findUnique({
            where: {
                id_order: ID
            }
        })
        prisma.$disconnect
       
        return findOrder
    }
    /**
     * 
     * @param {String} PRODUCT recebe o produto que foi escolhido pelo cliente
     * @param {String} QUANTITY recebe a quantidade de produto que o cliente quer
     * @param {String} ACCEPT recebe se o pedido foi aceito ou negado
     * @param {Id} ID_CLIENT recebe o id do cliente que realizou esse pedido
     * @returns retorna o metodo de criação de pedidos
     */
    async create_order(PRODUCT, QUANTITY, ACCEPT, ID_CLIENT) {
        await prisma.$connect
        const createOrder = await prisma.tb_order.create({
            data: {
                product: PRODUCT,
                quantity: QUANTITY,
                time: new Date(),
                accept: ACCEPT,
                id_client: ID_CLIENT
            }
        })
        await prisma.$disconnect
        return createOrder
    }
    /**
     * 
     * @param {String} PRODUCT recebe o novo produto do pedido
     * @param {String} QUANTITY recebe a quantidade de produto que o cliente quer
     * @param {String} ACCEPT recebe se o pedido foi aceito ou negado
     * @param {Id} ID_CLIENT recebe o id do cliente que realizou esse pedido
     * @returns retorna o metodo de atualização de pedidos
     */
    async update_order(ID, PRODUCT, QUANTITY, ACCEPT, ID_CLIENT) {
        await prisma.$connect
        const updateOrder = await prisma.tb_order.update({
            where: {
                id_order: ID
            },
            data: {
                product: PRODUCT,
                quantity: QUANTITY,
                accept: ACCEPT,
                id_client: ID_CLIENT
            },

        })
        await prisma.$disconnect
        return updateOrder
    }
    /**
     * 
     * @param {Int} ID recebe o ID do pedido a ser depetado
     * @returns retorna o metodo de deletar pedidos
     */
    async delete_order(ID) {
        await prisma.$connect
        const deleteOrder = await prisma.tb_order.delete({
            where: {
                id_order: ID
            }
        })
        await prisma.$disconnect
        return deleteOrder
    }
    /**
     * 
     * @param {Int} ID recebe o id do pedido a ser aprovado 
     * @param {Character} ACCEPT recebe o valor de aprovado ou não
     * @returns retorna o meotodo de aprovação ou negação de pedidos
     */
    async approve(ID, ACCEPT){
        prisma.$connect
        const approveOrder = await prisma.tb_order.update({
            where: {
                id_order: ID
            },
            data:{
                accept: ACCEPT
            }
        })
        prisma.$disconnect
        return approveOrder
    }
}

module.exports = new orderModel()