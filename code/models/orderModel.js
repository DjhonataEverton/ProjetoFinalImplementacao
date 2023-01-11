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


class orderModel {

    async list_orders() {
        await prisma.$connect
        const allOrders = await prisma.tb_order.findMany()
        await prisma.$disconnect

        return allOrders
    }

    async find_order(ID) {
        await prisma.$connect
        const findOrder = await prisma.tb_order.findUnique({
            where: {
                id_order: ID
            }
        })
        await prisma.$disconnect
       
        return findOrder
    }

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
}

module.exports = new orderModel()