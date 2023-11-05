const request = require('supertest');

const app = require("./index");


describe("Teste de login e cadastro", () => {
    it("teste dos parametros do login", () => {
        request(app).get("/login").expect("Content-Type", /json/).expect(200)
    });
})


