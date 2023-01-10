// model tb_commissionare {
//     id_commissionare Int    @id @default(autoincrement())
//     cpf              Int    @unique
//     name             String @db.VarChar(75)
//     email            String @unique @db.VarChar(75)
//     password         String @db.VarChar(45)
//   }

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class comissionaireModel {

    async list_comissionaires() {
        await prisma.$connect
        const allComissionaires = await prisma.tb_commissionare.findMany()
        await prisma.$disconnect

        return allComissionaires
    }

    async find_comissionaire_by_cpf(CPF) {
        await prisma.$connect
        const findComissionaire = await prisma.tb_commissionare.findUnique({
            where: {
                cpf: CPF
            }
        })
        await prisma.$disconnect

        if (findComissionaire == null) {
            return 'Comissionaire not found.'
        }

        return findComissionaire

    }

    async create_comissionaire(CPF, NAME, EMAIL, PASSWORD) {
        await prisma.$connect
        const createComissionaire = await prisma.tb_commissionare.create({
            data: {
                cpf: CPF,
                name: NAME,
                email: EMAIL,
                password: PASSWORD,
            },
        })
        await prisma.$disconnect

        return createComissionaire
    }

    async update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD) {
        await prisma.$connect
        const updateComissionaire = await prisma.tb_commissionare.update({
            where: {
                id_commissionare: ID
            },
            data: {
                cpf: CPF,
                name: NAME,
                email: EMAIL,
                password: PASSWORD,
            }
        })
        await prisma.$disconnect

        return updateComissionaire
    }
    async delete_comissionaire(ID) {
        await prisma.$connect
        const deleteComissionaire = await prisma.tb_commissionare.delete({
            where: {
                id_commissionare: ID
            }
        })
        await prisma.$disconnect

        return deleteComissionaire
    }
}

module.exports = new comissionaireModel()

// ----------TESTES----------

let comissionaire = new comissionaireModel()

// comissionaire.list_comissionaires()
//     .then(dados => console.log(dados))
//     .catch(err => console.log('Erro: ', err))

// comissionaire.find_comissionaire_by_cpf(122)
//     .then(dados => console.log(dados))
//     .catch(err => console.log('Erro: ', err))

// comissionaire.delete_comissionaire(1)
//     .then(dados => console.log("Dados deletados com sucesso.\n", dados))
//     .catch(err => console.log('Erro: ', err))

// comissionaire.create_comissionaire(123, 'teste', 'teste@teste', 'teste')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// comissionaire.create_comissionaire(1234, 'teste2', 'teste2@teste', 'teste2')
// .then(data => console.log(data))
// .catch(err => console.log(err))

// comissionaire.update_comissionaire(4, 122, 'testeUpdate', 'update@update', 'update')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))