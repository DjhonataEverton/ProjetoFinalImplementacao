const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class comissionaireModel {

    async list_comissionaires() {
        prisma.$connect
        const allComissionaires = await prisma.tb_commissionare.findMany()
        prisma.$disconnect

        return allComissionaires
    }

    async find_comissionaire_by_cpf(CPF) {
        prisma.$connect
        const findComissionaire = await prisma.tb_commissionare.findUnique({
            where: {
                cpf: CPF
            }
        })
        prisma.$disconnect

        return findComissionaire
    }

    async create_comissionaire(CPF, NAME, EMAIL, PASSWORD) {
        prisma.$connect
        const createComissionaire = await prisma.tb_commissionare.create({
            data: {
                cpf: CPF,
                name: NAME,
                email: EMAIL,
                password: PASSWORD,
            },
        })
        prisma.$disconnect

        return createComissionaire
    }

    async update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD) {
        prisma.$connect
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
        prisma.$disconnect

        return updateComissionaire
    }
    async delete_comissionaire(CPF) {
        prisma.$connect
        const deleteComissionaire = await prisma.tb_commissionare.delete({
            where: {
                cpf: CPF
            }
        })
        prisma.$disconnect

        return deleteComissionaire
    }

    async auth(EMAIL, PASSWORD){
        prisma.$connect
        const result = await prisma.tb_commissionare.findFirst({
            where:{
                email: EMAIL,
                password: PASSWORD
            }
        })
        prisma.$disconnect
        
        return result
    }
}

module.exports = new comissionaireModel()