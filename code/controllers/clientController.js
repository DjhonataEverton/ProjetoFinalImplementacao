const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController {

  async listClients(req, res) {
    if (!req.session.comissionaireIn) {
      return res.send('Página Restrita.')

    }

    const result = await clientModel.list_clients()
    return res.json(result)
  }

  async createClient(req, res) {
    const CPF = req.body.cpf
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    if (!CPF || !NAME || !EMAIL || !PASSWORD) {
      return res.send('Preencha todos os campos!')
    }

    const result = await clientModel.create_client(CPF, NAME, EMAIL, PASSWORD)
    return res.status(201).json(result)

  }

  async findByCPF(req, res) {
    if (!req.session.loggedin) {
      return res.send('Você não está logado!')

    }

    const CPF = parseInt(req.params.cpf)


    if (CPF != req.session.cpf) {
      return res.send('Não é possível listar a conta de outro usuário')
    }

    const result = await clientModel.find_client_by_CPF(CPF)
    if (result === null) {
      return res.status(404).send('Cliente não encontrado')
    }

    return res.json(result)

  }

  async updateByCpf(req, res) {

    if (!req.session.loggedin) {
      return res.send('Você não está logado!')
    }

    const CPF = parseInt(req.params.cpf)
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    if (CPF != req.session.cpf) {
      return res.send('Não é possivel atualizar a conta de outro usuário')
    }

    if (!CPF || !NAME || !EMAIL || !PASSWORD) {
      return res.send('Preencha todos os campos.')
    }

    try {
      const result = await clientModel.update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD)
      req.session.loggedin = false
      return res.json(result)

    } catch (err) {
      return res.send('Usuário não encontrado')
    }

  }

  async deleteByCpf(req, res) {
    if (!req.session.loggedin) {
      return res.send('Você não está logado!')
    }

    const CPF = parseInt(req.params.cpf)

    if (CPF != req.session.cpf) {
      return res.send('Não é possivel deletar a conta de outro usuário')
    }

    try {
      await clientModel.delete_client_by_CPF(CPF)

      req.session.loggedin = false
      req.session.cpf = undefined

      return res.send(`Cliente de CPF '${CPF}' deletado.`)

    } catch (err) {
      res.send('Usuário não encontrado!')
    }
  }

  async authenticate(req, res) {
    const CPF = req.body.cpf
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;

    if (!EMAIL || !PASSWORD || !CPF) {
      res.send('Digite todas as credenciais.')

    }

    if (typeof CPF === 'string') {
      return res.send('CPF deve ser valor numérico')
    }

    const auth = await clientModel.find_by_email_and_password(EMAIL, PASSWORD, CPF)

    if (auth) {
      req.session.loggedin = true
      req.session.cpf = CPF

      res.send('Usuario logado com sucesso')
    } else {
      res.send('Credenciais incorretas')
    }

  }

}


module.exports = new clientController()