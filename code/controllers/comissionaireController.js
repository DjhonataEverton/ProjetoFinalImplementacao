const prisma = require("@prisma/client")
const comissionaireModel = require("../models/comissionaireModel")

class comissionaireController {
    async listComissionaires() {
        const list = comissionaireModel.list_comissionaires()
        return await list
    }
    async createComissionaire(CPF, NAME, EMAIL, PASSWORD) {
        const create = comissionaireModel.create_comissionaire(CPF, NAME, EMAIL, PASSWORD)
        return await create
    }
    async findComissionaireByCPF(CPF) {
        const find = comissionaireModel.find_comissionaire_by_cpf(CPF)
        return await find
    }
    async updateComissionaire(ID, CPF, NAME, EMAIL, PASSWORD) {
        const update = comissionaireModel.update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD)
        return await update
    }
    async deleteComissionaire(ID) {
        const deleteC = comissionaireModel.delete_comissionaire(ID)
        return await deleteC
    }
}


