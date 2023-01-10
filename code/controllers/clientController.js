const prisma = require("@prisma/client")
const clientModel = require("../models/clientModel")

class clientController{
  async listClients(){
    return await clientModel.list_clients()
  }
}

//module.exports = new clientController()
let cliente = new clientController()

console.log(cliente.listClients())
