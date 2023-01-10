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

        return (allProducts)
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
        return (createProduct)
    }

    async find_product(ID) {
        await prisma.$connect
        const findProduct = await prisma.tb_products.findUnique({
            where: {
                id_products: ID
            }
        })
        await prisma.$disconnect
        if(findProduct == null){
            return "Produto não encontrado."
        } 
        
        return (findProduct)
    }

    async update_product(ID, PRODUCT, PRICE, UNITY) {
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
        return (updateProduct)
    }

    async delete_product(ID) {
        await prisma.$connect
        const deleteProduct = await prisma.tb_products.delete({
            where: {
                id_products: ID,
            },
        })
        await prisma.$disconnect
        return (deleteProduct)
    }
}


module.exports = new productModel()

// ----------TESTES----------

// let produto = new productModel()

// produto.list_products()
//     .then(dados => console.log(dados))
//     .catch(err => console.log('Erro: ', err))

// produto.find_product(555)
//     .then(dados => console.log(dados))
//     .catch(err => console.log('Erro: ', err))

// produto.delete_product(555)
//     .then(dados => console.log("Dados deletados com sucesso.\n", dados))
//     .catch(err => console.log('Erro: ', err))

// produto.create_product(555, "Maçã", 5.0, "quilograma")
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// produto.create_product(444,"Leite", 4, "litro")
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// produto.update_product(444, 'Açai', 6, 'litro')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))