const prisma = require("@prisma/client")
const comissionaireModel = require("../models/comissionaireModel")

class comissionaireController {
    async listComissionaires(req, res) {

        const list = await comissionaireModel.list_comissionaires()
        return res.json(list)
    }

    async createComissionaire(req, res) {
        const CPF = req.body.cpf
        const NAME = req.body.name
        const EMAIL = req.body.email
        const PASSWORD = req.body.password

        const create = await comissionaireModel.create_comissionaire(CPF, NAME, EMAIL, PASSWORD)
        return res.json(create)
    }

    async findComissionaireByCPF(req, res) {
        const CPF = parseInt(req.params.cpf)

        const find = await comissionaireModel.find_comissionaire_by_cpf(CPF)

        if(find === null){
            return res.status(404).send('Comissionário não encontrado.')
        }

        return res.json(find)
    }

    async updateComissionaire(req, res) {
        const ID = parseInt(req.params.id)
        const CPF = parseInt(req.body.cpf)
        const NAME = req.body.name
        const EMAIL = req.body.email
        const PASSWORD = req.body.password

        const update = await comissionaireModel.update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD)
        return res.json(update)
    }

    async deleteComissionaire(req, res) {
        const CPF = parseInt(req.params.cpf)

        await comissionaireModel.delete_comissionaire(CPF)
        return res.send(`Comissionário de CPF '${CPF} deletado.'`)
    }
}

module.exports = new comissionaireController()