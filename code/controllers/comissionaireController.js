const prisma = require("@prisma/client")
const comissionaireModel = require("../models/comissionaireModel")

class comissionaireController {
    async listComissionaires(req, res) {
        if (!req.session.comissionaireIn) {
            return res.send('Usuário não logado.')
        }
        
        const list = await comissionaireModel.list_comissionaires()
        return res.json(list)
    }

    async createComissionaire(req, res) {
        if(!req.session.comissionaireIn){
            res.send('Necessário privilégios superiores')
            
        }else{
            const CPF = req.body.cpf
            const NAME = req.body.name
            const EMAIL = req.body.email
            const PASSWORD = req.body.password
    
            if (!CPF || !NAME|| !EMAIL || !PASSWORD) {
                return res.send(`Preencha todos os campos!`)
            }
            
            const create = await comissionaireModel.create_comissionaire(CPF, NAME, EMAIL, PASSWORD)
            return res.json(create)
        }
    }

    async findComissionaireByCPF(req, res) {
        if (!req.session.comissionaireIn) {
            return res.send('Usuário não logado.')
            
        }
        const CPF = parseInt(req.params.cpf)

        const find = await comissionaireModel.find_comissionaire_by_cpf(CPF)

        if (find === null) {
            return res.status(404).send('Comissionário não encontrado.')
        }

        return res.json(find)
    }

    async updateComissionaire(req, res) {
        if (!req.session.comissionaireIn) {
            return res.send('Usuário não logado.')
        }

        const ID = parseInt(req.params.id)
        const CPF = req.body.cpf
        const NAME = req.body.name
        const EMAIL = req.body.email
        const PASSWORD = req.body.password

        if (!CPF || !NAME || !EMAIL || !PASSWORD) {
            return res.send('Preencha todos os campos!')
        }

        try {
            const update = await comissionaireModel.update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD)
            req.session.comissionaireIn = false
            return res.json(update)

        } catch (err) {
            res.send('Usuário não encontrado')
        }

    }

    async deleteComissionaire(req, res) {
        if (!req.session.comissionaireIn) {
            return res.send('Usuário não logado.')
        }

        try {
            const CPF = parseInt(req.params.cpf)

            await comissionaireModel.delete_comissionaire(CPF)
            return res.send(`Comissionário de CPF '${CPF}' deletado.`)
            
        } catch (err) {
            return res.send('Usuário nao encontrado.')
        }
    }

    async authenticate(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.send('Preencha todos os dados.')
        }

        const EMAIL = req.body.email
        const PASSWORD = req.body.password
        const CPF = parseInt(req.body.cpf)

        const AUTH = await comissionaireModel.auth(EMAIL, PASSWORD, CPF)

        if (AUTH === null) {
            return res.send('Credenciais incorretas.')
        }

        req.session.comissionaireIn = true
        req.session.comissionaireCPF = CPF

        return res.redirect('/')
    }
}

module.exports = new comissionaireController()