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

async function selectReceita (dado){
    const params = [dado.id]
    try{
        const result = await conexao.query("SELECT * from receitas WHERE id=?;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function deleteReceita (dado){
    const params = [dado.id_receitas]
    try{
        await conexao.query("DELETE from avaliacao WHERE id_receita=?;", params); // mudar para receitas né
        await conexao.query("DELETE from curtidas WHERE id_receitas=?;", params);
        await conexao.query("DELETE from comentarios WHERE id_receitas=?;", params);
        const result = await conexao.query("DELETE from receitas WHERE id_receitas=?;", params);
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAllReceita (){
    try{
        const result = await conexao.query("SELECT * from receitas;");
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function insertAvaliacao (dado){
    const params = [dado.id_usuario, dado.id_receita, dado.nota]
    try{
        const result = await conexao.query("INSERT INTO avaliacao (id_usuario, id_receita, nota) VALUES (?, ?, ?);", params);   
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAvaliacao (dado){
    const params = [dado.id_receita]
    try{
        const result = await conexao.query("SELECT AVG(nota) from avaliacao GROUP BY id_receita having id_receita = ? ;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectFiltro (dado){
    const params = [dado.nota]
    try{
        const result = await conexao.query("SELECT * from receitas WHERE LOWER(titulo) LIKE '%" + dado.string + "%' and id_receitas IN (SELECT id_receita from avaliacao GROUP BY id_receita having AVG(nota) >= ?);", params);
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

module.exports = {
    selectUsuario,
    insertUsuario,
    updateUsuario,
    insertReceita,
    updateReceita,
    selectReceita,
    deleteReceita,
    selectAllReceita,
    insertAvaliacao,
    selectAvaliacao,
    selectFiltro
}