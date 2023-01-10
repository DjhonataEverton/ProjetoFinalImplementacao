const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController{
  async listClients(){
    const list = clientModel.list_clients()
    return await list
  }
  async createClient(CPF,NAME,EMAIL,PASSWORD){
    const create = clientModel.create_client(CPF,NAME,EMAIL,PASSWORD)
    return  await create
  }
  async findByCPF(CPF){
    const find = clientModel.find_client_by_CPF(CPF)
    return await find
  }
}

//module.exports = new clientController()
let cliente = new clientController()

//console.log(cliente.listClients())
//console.log(cliente.findByCPF(222111))
