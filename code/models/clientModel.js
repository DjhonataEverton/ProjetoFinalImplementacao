const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
/**
 * @class classe responsável por guardar os metodos dos modelos de acesso ao banco de dados dos clientes
 */
class clientModel {
    /**
     * 
     * @returns retorna em uma variável todos os clientes que existem no banco de dados
     */
    async list_clients() {
        await prisma.$connect()
        const allClients = await prisma.tb_client.findMany()
        prisma.$disconnect

        return allClients
    }
    /**
     * 
     * @param {int} CPF recebe o cpf do cliente a cadastrar
     * @param {String} NAME recebe o nome do cliente a ser cadastado
     * @param {String} EMAIL recebbe o email do cliente a ser cadastrado
     * @param {String} PASSWORD recebe a senha do cliente a ser cadastrado
     * @returns retorna o metodo de criação de clientes no banco de dados
     */
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
    /**
     * 
     * @param {Int} CPF recebe o cpf do cleinte que deseja listar
     * @returns retorna o cliente relacionado ao cpf inserido
     */  
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
    /**
     * 
     * @param {int} CPF recebe o cpf do cliente a atualizar
     * @param {String} NAME recebe o nome do cliente a ser atualizado
     * @param {String} EMAIL recebbe o email do cliente a ser atualizado
     * @param {String} PASSWORD recebe a senha do cliente a ser atualizado
     * @returns retorna o metodo de atualização de clientes no banco de dados
     */
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
    /**
     * 
     * @param {Int} CPF recebe o CPF do cliente a ser deletado do banco de dados
     * @returns retorna o metodo de deletar clientes
     */
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
    /**
     * 
     * @param {String} EMAIL recebe o email do cliente a ser encontrado
     * @param {String} PASSWORD recebe a senba do cleinte a ser encontrado
     * @param {Int} CPF recebe o CPF do cleinte a ser encontrado
     * @returns retorna o metodo de encontrar o cliente pelo EMAIL PASSWORD CPF
     */
    async find_by_email_and_password(EMAIL, PASSWORD, CPF) {
        prisma.$connect
        const findClient = await prisma.tb_client.findFirst({
            where: {
                email: EMAIL,
                password: PASSWORD,
                cpf_cnpj: CPF
            }
        })
        prisma.$disconnect
        return findClient
    }
}


module.exports = new clientModel()