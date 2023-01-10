const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// model tb_products {
//     id_products Int    @id @default(autoincrement())
//     product     String @db.VarChar(45)
//     price       Int 
//     unity       String @db.Text
//   }

class productModel {
    async list_products() {
        await prisma.$connect()
        const allProducts = await prisma.tb_products.findMany()
        await prisma.$disconnect

        console.log(allProducts)
    }

    async create_product(ID, PRODUCT, PRICE, UNITY) {
        await prisma.$connect
        const createProduct = await prisma.tb_products.create({
            data: {
                id_products: ID,
                product: PRODUCT,
                price: PRICE,
                unity: UNITY
            }
        })
        await prisma.$disconnect
        return console.log(createProduct)
    }

    async find_client_by_CPF(ID) {
        await prisma.$connect
        const findProduct = await prisma.tb_products.findUnique({
            where: {
                id_products: ID
            }
        })
        await prisma.$disconnect
        return console.log(findProduct)
    }

    async update_client(ID, PRODUCT, PRICE, UNITY) {
        await prisma.$connect
        const updateProduct = await prisma.tb_products.update({
            where: {
                id_products: ID
            },
            data: {
                product: PRODUCT,
                price: PRICE,
                unity: UNITY
            },
        })
        await prisma.$disconnect
        return console.log(updateProduct)
    }

    async delete_client(ID) {
        await prisma.$connect
        const deleteProduct = await prisma.tb_products.delete({
            where: {
                id_products: ID,
            },
        })
        await prisma.$disconnect
        return console.log(deleteProduct)
    }
}


module.exports = new productModel()