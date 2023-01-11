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
    async delete_comissionaire(CPF) {
        await prisma.$connect
        const deleteComissionaire = await prisma.tb_commissionare.delete({
            where: {
                cpf: CPF
            }
        })
        await prisma.$disconnect

        return deleteComissionaire
    }
}

module.exports = new comissionaireModel()