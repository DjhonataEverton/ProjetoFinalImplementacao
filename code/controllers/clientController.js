const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController{
  async listClients(){
    const List = clientModel.list_clients()
    return await List
  }
  async createClient(CPF,NAME,EMAIL,PASSWORD){
    const Create = clientModel.create_client(CPF,NAME,EMAIL,PASSWORD)
    return  await Create
  }
  async findByCPF(CPF){
    const Find = clientModel.find_client_by_CPF(CPF)
    return await Find
  }
  async updateClient(CPF,NAME,EMAIL,PASSWORD){
    const Update = clientModel.update_client(CPF,NAME,EMAIL,PASSWORD)
    return await Update
  }
  async deleteClient(CPF){
    const Delete = clientModel.delete_client(CPF)
    return await Delete
  }
}

module.exports = new clientController()

let cliente = new clientController()

//----------TESTES----------

//console.log(cliente.listClients())
//console.log(cliente.findByCPF(222111))
