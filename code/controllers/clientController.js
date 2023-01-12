const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController {

  async listClients(req, res) {
    if (req.session.loggedin === true) {

      const List = await clientModel.list_clients()
      return res.json(List)

    }

    return res.send('Você não está logado!')
  }

  async createClient(req, res) {
    const CPF = req.body.cpf
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    const Create = await clientModel.create_client(CPF, NAME, EMAIL, PASSWORD)
    return res.status(201).json(Create)

  }

  async findByCPF(req, res) {
    if(req.session.loggedin === true){
      const CPF = parseInt(req.params.cpf)
  
      const Find = await clientModel.find_client_by_CPF(CPF)
      if (Find === null) {
        return res.status(404).send('Cliente não encontrado')
      }
  
      return res.json(Find)
    }

    return res.send('Você não está logado!')
  }

  async updateByCpf(req, res) {
    if (req.session.loggedin === true) {
      const CPF = parseInt(req.params.cpf)
      const NAME = req.body.name
      const EMAIL = req.body.email
      const PASSWORD = req.body.password

      const Update = await clientModel.update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD)
      return res.json(Update)
    }

    return res.send('Você não está logado!')

  }

  async deleteByCpf(req, res) {
    if (req.session.loggedin === true) {
      const CPF = parseInt(req.params.cpf)

      await clientModel.delete_client_by_CPF(CPF)
      return res.send(`Cliente de CPF '${CPF}' deletado.`)

    }

    return res.send('Você não está logado!')
  }

  async authenticate(req, res) {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;

    if (EMAIL && PASSWORD) {

      const auth = await clientModel.find_by_email_and_password(EMAIL, PASSWORD)

      if (auth) {
        req.session.loggedin = true

        res.redirect('/')
      } else {
        res.send('Credenciais incorretas')
      }

    } else {
      res.send('Digite todas as credenciais.')
    }
  }

}

module.exports = new clientController()