const request = require("supertest");
const ApiUrl = "http://localhost:3000";


// Criação de clientes
describe("POST /clientes/add", function () {
    it("should return 400 and return 'Preencha todos os campos!'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send({})
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400);
        expect(response.text).toEqual("Preencha todos os campos!");
    })


    it("should return 400 and return 'CPF deve ser um número!'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send({ cpf: 'as', name: '333', email: '55', password: '22' })
            .expect(400);
        expect(response.text).toEqual("CPF deve ser um número!");
    })


    it("should return 400 and return 'CPF já cadastrado'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send()
            .send({ cpf: 1112, name: 'AAA2', email: 'AAA2', password: 'AAA2' })
            .expect(400);
        expect(response.text).toEqual('CPF já cadastrado')
    })


    it("should return 400 and return 'Email já cadastrado'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send({ cpf: 11120000, name: 'AAA2asdas', email: 'AAA2', password: 'AAasdaA2' })
            .expect(400);
        expect(response.text).toEqual('Email já cadastrado')
    })
})


// Autenticação de clientes
describe("POST /clientes/auth", function () {
    it("should return 401 and return 'Credenciais incorretas'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/auth")
            .send({ cpf: 1112, email: 'AAA2', password: '12' })
            .expect(401);
        expect(response.text).toEqual('Credenciais incorretas')
    })

    it("should return 400 and return 'Preencha todos os campos!'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/auth")
            .send({ cpf: 1112 })
            .expect(400)
        expect(response.text).toEqual('Preencha todos os campos!')
    })

    it("should return 400 and return 'CPF deve ser valor numérico'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/auth")
            .send({ cpf: "a", email: "AAA", password: "aa" })
            .expect(400)
        expect(response.text).toEqual('CPF deve ser valor numérico')
    })

    it("should return 400 and return 'Senha deve ser string'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/auth")
            .send({ cpf: 12, email: "AAA", password: 12 })
            .expect(400)
        expect(response.text).toEqual('Senha deve ser string')
    })

    it("should return 200 and return 'Usuario logado com sucesso'", async () => {
        const response = await request(ApiUrl)
            .post('/clientes/auth')
            .send({ cpf: 123, email: "teste", password: "teste" })
            .expect(200)
    })
})


// Busca de clientes
describe("GET /clientes", function () {

    it("should return 401 and return 'Página Restrita.'", async () => {
        const response = await request(ApiUrl)
            .get("/clientes")
            .expect(401);
        expect(response.text).toEqual("Página Restrita.");
    })


    // it("should return 200", async () => {
    //     const response = await request(ApiUrl)
    //         .get("/clientes")
    //         .set("Cookie", "7uA72G69XA4ieKyMt90zk9YQZv6pxqTB")
    //         .expect(200)
    //     console.log(response.header)
    // })


    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .get("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})


// Atualização de clientes
describe("PUT /clientes/{id}", function () {
    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .put("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})


// Remoção de clientes
describe("DELETE /clientes/{id}", function () {
    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .delete("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})