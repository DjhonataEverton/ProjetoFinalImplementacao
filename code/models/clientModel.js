const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

class clientModel{
    async list_clients(){
        await prisma.$connect()
        const allClients = await prisma.tb_client.findMany()
        await prisma.$disconnect
        
        return allClients
    }

    async create_client(CPF, NAME, EMAIL,PASSWORD){
        await prisma.$connect
        const created = await prisma.tb_client.create({
            data:{
                cpf_cnpj: CPF,
                name: NAME,
                email: EMAIL,
                password: PASSWORD
            }
        })
        await prisma.$disconnect
        return created
    }

    async find_client_by_CPF(CPF){
        await prisma.$connect
        const findClient = await prisma.tb_client.findUnique({
            where:{
                cpf_cnpj: CPF
            }
        })
        await prisma.$disconnect
        return findClient
    }

    async update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD){
        await prisma.$connect
        const updateClient = await prisma.tb_client.update({
            where: {
                cpf_cnpj: CPF
            },
            data: {
                name: NAME,
                email: EMAIL,
                password: PASSWORD
            },
        })
        await prisma.$disconnect
        return updateClient
    }

    async delete_client_by_CPF(CPF){
        await prisma.$connect
        const deleteClient = await prisma.tb_client.delete({
            where: {
              cpf_cnpj: CPF,
            },
          })
          await prisma.$disconnect
          return deleteClient
    }
}


module.exports = new clientModel()

//----------TESTES----------

// let cliente = new clientModel()

// cliente.list_clients()
//     .then(dados => console.log(dados))
//     .catch(err => console.log('Erro: ', err))

// cliente.find_client_by_CPF(555444)
//    .then(dados => console.log(dados))
//    .catch(err => console.log('Erro: ', err))

// cliente.delete_client(555444)
//     .then(dados => console.log("Dados deletados com sucesso.\n", dados))
//     .catch(err => console.log('Erro: ', err))

// cliente.create_client(555,"Pedro", "Pedro@gmail.com", "Pedro123")
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// cliente.create_client(444,"teste", "teste@teste.com", "teste")
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// cliente.update_client(444, 'testeUpdate', 'update@update.com', 'update')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))


