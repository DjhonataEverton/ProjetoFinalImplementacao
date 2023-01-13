const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
/**
 * @class classe responsável por guardar os metodos dos modelos de acesso ao banco de dados dos funcionarios
 */
class comissionaireModel {
    /**
     * 
     * @returns retorna em uma variável todos os funcionarios que existem no banco de dados
     */
    async list_comissionaires() {
        prisma.$connect
        const allComissionaires = await prisma.tb_commissionare.findMany()
        prisma.$disconnect

        return allComissionaires
    }
    /**
     * 
     * @param {Int} CPF recebe o CPF do funcionario que deseja listar
     * @returns retorna o funcoonario relacionado ao CPF inserido
     */  
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
    /**
     * 
     * @param {Int} ID recebe o ID do cleinte que deseja listar
     * @returns retorna o funcionario relacionado ao ID inserido
     */  
    async find_comissionaire_by_id(ID) {
        prisma.$connect
        const findComissionaire = await prisma.tb_commissionare.findUnique({
            where: {
                id_commissionare: ID
            }
        })
        prisma.$disconnect

        return findComissionaire
    }
    /**
     * 
     * @param {int} CPF recebe o cpf do funcionario a cadastrar
     * @param {String} NAME recebe o nome do funcionario a ser cadastado
     * @param {String} EMAIL recebbe o email do funcionario a ser cadastrado
     * @param {String} PASSWORD recebe a senha do funcionario a ser cadastrado
     * @returns retorna o metodo de criação de funcionario no banco de dados
     */
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
    /**
     * @param {Int} ID recce o ID do funcionario a atualizar
     * @param {Int} CPF recebe o cpf do funcionario a atualizar
     * @param {String} NAME recebe o nome do funcionario a ser atualizado
     * @param {String} EMAIL recebbe o email do funcionario a ser atualizado
     * @param {String} PASSWORD recebe a senha do funcionario a ser atualizado
     * @returns retorna o metodo de atualização de funcionario no banco de dados
     */
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
    /**
     * 
     * @param {Int} CPF recebe o CPF do funcionario a ser deletado do banco de dados
     * @returns retorna o metodo de deletar funcionarios
     */
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
    /**
     * 
     * @param {String} EMAIL recebe o email do funcionario a ser autenticado 
     * @param {String} PASSWORD recebe a senha do funcionario a ser autenticado  
     * @param {Int} CPF recebe o CPF do funcionario a ser autenticado  
     * @returns 
     */
    async auth(EMAIL, PASSWORD, CPF){
        prisma.$connect
        const result = await prisma.tb_commissionare.findFirst({
            where:{
                email: EMAIL,
                password: PASSWORD,
                cpf: CPF
            }
        })
        prisma.$disconnect
        
        return result
    }
}

module.exports = new comissionaireModel()