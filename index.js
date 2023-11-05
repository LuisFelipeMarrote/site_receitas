require("dotenv").config();

const { json } = require("express");
const express = require("express");
const cors = require("cors")
const app = express();

const bd = require("./database")

app.use(express.json());

app.post("/login", async (req, res) => {
    const dado = req.body;
    const corpo = await bd.selectUsuario(dado);
    if (corpo != null){
        res.set('Content-Type', 'application/json');
        res.send(corpo).status(200);  /// mudar o envio do int do id para string
    }
    else{
        res.set('Content-Type', 'application/json');
        res.status(204).send();        
    }    

})

app.post("/cadastro", async (req, res) => {
    const dado = req.body;
    const corpo = await bd.insertUsuario(dado);
    if (corpo != null){
        res.set('Content-Type', 'application/json');
        res.status(200).send();
    }
    else{   
        res.set('Content-Type', 'application/json');
        res.status(204);
        res.send(JSON.stringify("Cadastro falhou"));
    }
})

app.post("/update", async (req, res) => {
    const dado = req.body;
    const corpo = await bd.updateUsuario(dado);
    if (corpo != null){
        res.set('Content-Type', 'application/json');
        res.status(200).send();
    }
    else{   
        res.set('Content-Type', 'application/json');
        res.status(204);
        res.send(JSON.stringify("Atualização cadastral falhou"));
    }
})

app.post("/receita/cadastro", async (req, res) => {
    const dado = req.body;
    const corpo = await bd.insertReceita(dado);
    if (corpo != null){
        res.set('Content-Type', 'application/json');
        res.send(corpo).status(200);  
    }
    else{
        res.set('Content-Type', 'application/json');
        res.status(204).send();        
    }    

})

app.post("/receita/update", async (req, res) => {
    const dado = req.body;
    const corpo = await bd.updateReceita(dado);
    if (corpo != null){
        res.set('Content-Type', 'application/json');
        res.send(corpo).status(200);  
    }
    else{
        res.set('Content-Type', 'application/json');
        res.status(204).send();        
    }    

})

app.use(cors({
    origin: ['http://localhost:8000']
}))

app.listen(process.env.PORT, () => {
    console.log("O bagulho ta legal");
})


