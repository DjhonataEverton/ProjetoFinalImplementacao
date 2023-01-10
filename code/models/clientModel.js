const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

class clientModel{
    async listClient(){
        await prisma.$connect()
        const allClients = await prisma.tb_client.findMany()
        await prisma.$disconnect
        return console.log(allClients)
    }

    async createClient(CPF, NAME, EMAIL,PASSWORD){
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

    async findClientByCPF(CPF){
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


//module.exports = new clientModel()
//----------TESTES----------

let cliente = new clientModel()

//console.log(cliente.findClientByCPF(123))
cliente.createClient(555444,"Pedro", "Pedro@gmail.com", "Pedro123")

//console.log(cliente.listClient())


