const mysql = require("mysql2/promise");

const conexao = mysql.createPool(process.env.CONNECTION_STRING);

async function selectUsuario (dado){
    const params = [dado.email, dado.senha, dado.usuario]
    try{
        const result = await conexao.query("SELECT * from clientes WHERE email=? and senha=? and usuario=?;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function insertUsuario (dado){
    const params = [dado.usuario, dado.email, dado.senha, dado.nome];
    try{
        const result = await conexao.query("INSERT INTO clientes (usuario, email, senha, nome) VALUES (?, ?, ?, ?);", params);    
        return result[0];
    }
    catch (e){
        console.log(e)
        return;
    }
}

async function updateUsuario (dado){
    const params = [ dado.email, dado.senha, dado.nome, dado.id];
    try{
        const result = await conexao.query("UPDATE clientes SET email=?, senha=?, nome=? WHERE id=?;", params);    
        return result[0];
    }
    catch (e){
        console.log(e)
        return;
    }
}

async function insertReceita (dado){
    const params = [dado.titulo_receitas, dado.descricao, dado.requisitos, dado.preparo]
    try{
        const result = await conexao.query("INSERT INTO receitas (titulo, descricao, requisitos, preparo) VALUES (?, ?, ?, ?);", params);   
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function updateReceita (dado){
    const params = [dado.titulo_receitas, dado.descricao, dado.requisitos, dado.preparo, dado.id]
    try{
        const result = await conexao.query("UPDATE receitas SET titulo=?, descricao=?, requisitos=?, preparo=? WHERE id_receitas=?;", params);    
        return result[0];
    }
    catch (e){
        console.log(e)
        return;
    }
}

module.exports = {
    selectUsuario,
    insertUsuario,
    updateUsuario,
    insertReceita,
    updateReceita
}