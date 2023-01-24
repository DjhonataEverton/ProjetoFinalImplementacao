const request = require("supertest");
const ApiUrl = "http://localhost:3000";

describe("POST /clientes/add", function(){
    it("should return 400", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send({})
            .expect(400);
        expect(response.text).toEqual("Preencha todos os campos!");
    })
})

describe("POST /clientes/add", function(){
    it("should return 400 and return 'CPF já cadastrado'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/add")
            .send({cpf: 1112, name: 'AAA2', email: 'AAA2', password: 'AAA2'})
            .expect(400);
        expect(response.text).toEqual('CPF já cadastrado')
    })
})

describe("POST /clientes/auth", function(){
    it("should return 401 and return 'Credenciais incorretas'", async () => {
        const response = await request(ApiUrl)
            .post("/clientes/auth")
            .send({cpf: 1112, email: 'AAA2', password: '12'})
            .expect(401);
        expect(response.text).toEqual('Credenciais incorretas')
    })
})

describe("GET /clientes", function(){
    it("should return 401 and return 'Página Restrita.'", async () => {
        const response = await request(ApiUrl)
            .get("/clientes")
            .expect(401);
        expect(response.text).toEqual("Página Restrita.");
    })
})

describe("GET /clientes/{id}", function(){
    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .get("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})

describe("PUT /clientes/{id}", function(){
    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .put("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})

describe("DELETE /clientes/{id}", function(){
    it("should return 401 and return 'Você não está logado!'", async () => {
        const response = await request(ApiUrl)
            .delete("/clientes/123")
            .expect(401);
        expect(response.text).toEqual("Você não está logado!");
    })
})