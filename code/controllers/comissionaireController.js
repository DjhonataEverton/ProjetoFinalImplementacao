const comissionaireModel = require("../models/comissionaireModel")

/**
 * @class classe responsável por guardar os metodos de tratamento das requisições e respostas dos funcionarios
 */
class comissionaireController {
    /**
     * 
     * @param {function} req realiza a requisição da sessão de login do usuario
     * @param {funciton} res responde com um json os resultados
     * @returns retorna o json com os dados vindos do banco de dados
    */
    async listComissionaires(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Funcionário não logado.')
        }

        const result = await comissionaireModel.list_comissionaires()
        return res.json(result)
    }
    /**
    * 
    * @param {function} req realiza a requisição da sessão de login do usuario
    * @param {funciton} res responde com um json os resultados
    * @returns retorna um json com os dados do funcionario cadastrado
    */
    async createComissionaire(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Funcionário não logado.')

        } else {
            const CPF = req.body.cpf
            const NAME = req.body.name
            const EMAIL = req.body.email
            const PASSWORD = req.body.password

            if (!CPF || !NAME || !EMAIL || !PASSWORD) {
                return res.status(400).send(`Preencha todos os campos!`)
            }

            if (typeof CPF == 'string') {
                return res.status(400).send('O CPF precisa ser um número.')
            }

            const create = await comissionaireModel.create_comissionaire(CPF, NAME, EMAIL, PASSWORD)
            return res.status(201).json(create)
        }
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com o funcionario relacioado ao cpf inserido
   */
    async findComissionaireByCPF(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Funcionário não logado.')

        }
        const CPF = parseInt(req.params.cpf)

        const result = await comissionaireModel.find_comissionaire_by_cpf(CPF)

        if (result === null) {
            return res.status(404).send('Funcionário nao encontrado.')
        }

        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna um json com os dados atualizados do funcionario
   */
    async updateComissionaire(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Funcionário não logado.')
        }

        const ID = parseInt(req.params.id)
        const CPF = req.body.cpf
        const NAME = req.body.name
        const EMAIL = req.body.email
        const PASSWORD = req.body.password

        if (!CPF || !NAME || !EMAIL || !PASSWORD) {
            return res.status(400).send('Preencha todos os campos.')
        }

        const find = await comissionaireModel.find_comissionaire_by_id(ID)
        if (find === null) {
            return res.status(404).send('Funcionário nao encontrado.')
        }

        if (typeof CPF == 'string') {
            return res.status(400).send('O CPF precisa ser um número.')
        }

        if (find.id_commissionare != req.session.comissionaireId) {
            return res.send('Não é possível atualizar a conta de outro funcionário.')
        }

        const result = await comissionaireModel.update_comissionaire(ID, CPF, NAME, EMAIL, PASSWORD)

        req.session.comissionaireId = false

        return res.json(result)
    }
    /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a confirmação do funcionario deletado, se o cpf inserido existir no banco de dados
   */
    async deleteComissionaire(req, res) {
        if (!req.session.comissionaireId) {
            return res.status(401).send('Funcionário não logado.')
        }

        const CPF = parseInt(req.params.cpf)

        const find = await comissionaireModel.find_comissionaire_by_cpf(CPF)
        if (find === null) {
            return res.status(404).send('Funcionário nao encontrado.')
        }

        if (find.id_commissionare == req.session.comissionaireId) {
            return res.send('Não é possível deletar a si mesmo.')
        }

        await comissionaireModel.delete_comissionaire(CPF)
        return res.send(`Funcionário de CPF '${CPF}' deletado.`)
    }

    /**
   * @param {function} req realiza a requisião dos dados do usuario pra efetuar o login
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a verificação de login do funcionario, se existir no banco, ele loga.
   */
    async authenticate(req, res) {
        const EMAIL = req.body.email
        const PASSWORD = req.body.password
        const CPF = parseInt(req.body.cpf)

        if (!EMAIL || !PASSWORD || !CPF) {
            return res.status(400).send('Preencha todos os campos.')
        }

        const AUTH = await comissionaireModel.auth(EMAIL, PASSWORD, CPF)

        if (AUTH === null) {
            return res.status(401).send('Credenciais incorretas.')
        }

        req.session.comissionaireId = AUTH.id_commissionare
        req.session.clientCpf = false
        req.session.clientId = false

        return res.send('Funcionário logado com sucesso.')
    }


    // Rotas front
    async login(req, res) {
        
    }
}

module.exports = new comissionaireController()