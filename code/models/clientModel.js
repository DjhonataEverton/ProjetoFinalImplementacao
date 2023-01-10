const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

class clientModel{
    async list_clients(){
        await prisma.$connect()
        const allClients = await prisma.tb_client.findMany()
        await prisma.$disconnect
        
        console.log(allClients)
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
        return console.log(created)
    }

    async find_client_by_CPF(CPF){
        await prisma.$connect
        const findCLient = await prisma.tb_client.findUnique({
            where:{
                cpf_cnpj: CPF
            }
        })
        await prisma.$disconnect
        return console.log(findCLient)
    }
}


module.exports = new clientModel()

//----------TESTES----------

//let cliente = new clientModel()

//console.log(cliente.list_clients())
//console.log(cliente.find_client_by_CPF(123))
//cliente.createClient(555444,"Pedro", "Pedro@gmail.com", "Pedro123")


