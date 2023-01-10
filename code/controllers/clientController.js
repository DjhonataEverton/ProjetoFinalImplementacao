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
  async updateClient(CPF,NAME,EMAIL,PASSWORD){
    const update = clientModel.update_client(CPF,NAME,EMAIL,PASSWORD)
    return await update
  }
  async deleteClient(CPF){
    const deleteC = clientModel.delete_client(CPF)
    return await deleteC
  }
}

//module.exports = new clientController()
let cliente = new clientController()

//console.log(cliente.listClients())
//console.log(cliente.findByCPF(222111))
