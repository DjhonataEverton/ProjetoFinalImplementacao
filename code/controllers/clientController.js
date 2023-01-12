const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController {

  async listClients(req, res) {
    
    const List = await clientModel.list_clients()
    return res.json(List)
  }

  async createClient(req, res) {

    const CPF = req.body.cpf_cnpj
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password
    
    const Create = await clientModel.create_client(CPF, NAME, EMAIL, PASSWORD)
    return res.status(201).json(Create)
  }

  async findByCPF(req, res) {
    const CPF = parseInt(req.params.cpf)

    const Find = await clientModel.find_client_by_CPF(CPF)
    if(Find === null){
      return res.status(404).send('Cliente não encontrado')
    }

    return res.json(Find)
  }

  async updateByCpf(req, res) {
    const CPF = parseInt(req.params.cpf)
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    const Update = await clientModel.update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD)
    return res.json(Update)
  }

  async deleteByCpf(req, res) {
    const CPF = parseInt(req.params.cpf)

    const Delete = await clientModel.delete_client_by_CPF(CPF)
    return res.send(`Cliente de CPF '${CPF}' deletado.`)
  }
}

module.exports = new clientController()