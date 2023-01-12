const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class clientModel {
    async list_clients() {
        await prisma.$connect()
        const allClients = await prisma.tb_client.findMany()
        prisma.$disconnect

        return allClients
    }

    async create_client(CPF, NAME, EMAIL, PASSWORD) {
        prisma.$connect
        const created = await prisma.tb_client.create({
            data: {
                cpf_cnpj: CPF,
                name: NAME,
                email: EMAIL,
                password: PASSWORD
            }
        })
        prisma.$disconnect
        return created
    }

    async find_client_by_CPF(CPF) {
        prisma.$connect
        const findClient = await prisma.tb_client.findFirst({
            where: {
                cpf_cnpj: CPF
            }
        })
        prisma.$disconnect
        return findClient
    }

    async update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD) {
        prisma.$connect
        const updateClient = await prisma.tb_client.update({
            where: {
                cpf_cnpj: CPF
            },
            data: {
                name: NAME,
                email: EMAIL,
                password: PASSWORD
            },
        })
        prisma.$disconnect
        return updateClient
    }

    async delete_client_by_CPF(CPF) {
        prisma.$connect
        const deleteClient = await prisma.tb_client.delete({
            where: {
                cpf_cnpj: CPF,
            },
        })
        prisma.$disconnect
        return deleteClient
    }

    async find_by_email_and_password(EMAIL, PASSWORD) {
        prisma.$connect
        const findClient = await prisma.tb_client.findFirst({
            where: {
                email: EMAIL,
                password: PASSWORD
            }
        })
        prisma.$disconnect
        return findClient
    }
}


module.exports = new clientModel()