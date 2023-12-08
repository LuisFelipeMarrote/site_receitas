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
    const params = [dado.id_usuario, dado.titulo_receitas, dado.descricao, dado.requisitos, dado.preparo]
    try{
        const result = await conexao.query("INSERT INTO receitas (id_usuario, titulo, descricao, requisitos, preparo) VALUES (?, ?, ?, ?, ?);", params);   
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function updateReceita (dado){
    const params = [dado.titulo_receitas, dado.descricao, dado.requisitos, dado.preparo, dado.id, dado.id_usuario]
    try{
        const result = await conexao.query("UPDATE receitas SET titulo=?, descricao=?, requisitos=?, preparo=? WHERE id_receitas=? and id_usuario=?;", params);    
        return result[0];
    }
    catch (e){
        console.log(e)
        return;
    }
}

async function selectReceita (id_receitas){
    const params = [id_receitas]
    try{
        const result = await conexao.query("SELECT * from receitas WHERE id_receitas=?;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAllReceitaUsuario (id_usuario){
    const params = [id_usuario]
    try{
        const result = await conexao.query("SELECT * from receitas WHERE id_usuario=?;", params);
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function deleteReceita (dado){
    const params = [dado.id_receitas]
    try{
        await conexao.query("DELETE from avaliacao WHERE id_receitas=?;", params); // mudar para receitas né
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
    const params = [dado.id_usuario, dado.id_receitas, dado.nota]
    try{
        const result = await conexao.query("INSERT INTO avaliacao (id_usuario, id_receitas, nota) VALUES (?, ?, ?);", params);   
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAvaliacao (dado){
    const params = [dado.id_receitas]
    try{
        const result = await conexao.query("SELECT AVG(nota) from avaliacao GROUP BY id_receitas having id_receitas = ? ;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAvaliacaoUsuario (dado){
    const params = [dado.id_receitas, id_receitas]
    try{
        const result = await conexao.query("SELECT nota from avaliacao WHERE id_receitas=? and id_usuario=? ;", params);
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
        const result = await conexao.query("SELECT * from receitas WHERE LOWER(titulo) LIKE '%" + dado.string + "%' and id_receitas NOT IN (SELECT id_receitas from avaliacao GROUP BY id_receitas having AVG(nota) < ?);", params);
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function insertCurtida (dado){
    const params = [dado.id_usuario, dado.id_receitas]
    console.log(params);
    try{
        const result = await conexao.query("SELECT * from curtidas WHERE id_usuario=? and id_receitas=?;", params);
        if(result[0][0] != null){
            const result2 = await conexao.query("DELETE from curtidas WHERE id_usuario=? and id_receitas=?;", params);       
            return result2[0];
        }
        else{
            const result2 = await conexao.query("INSERT INTO curtidas (id_usuario, id_receitas) VALUES (?, ?);", params);          
            return result2[0];
        }
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectCurtida (id_usuario, id_receitas){
    const params = [id_usuario, id_receitas]
    try{
        const result = await conexao.query("SELECT * from curtidas WHERE id_usuario=? and id_receitas=?;", params);
        return result[0][0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAllCurtida (id_usuario){
    const params = [id_usuario]
    try{
        const result = await conexao.query("SELECT * from curtidas WHERE id_usuario=?;", params);
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function insertComentario (dado){
    const params = [dado.id_usuario, dado.id_receitas, dado.texto]
    try{
        const result = await conexao.query("INSERT INTO comentarios (id_usuario, id_receitas, texto) VALUES (?, ?, ?);", params);   
        return result[0];
    }
    catch(e){
        console.log(e)
        return;
    }
}

async function selectAllComentario (id_receitas){
    const params = [id_receitas]
    try{
        const result = await conexao.query("SELECT * from comentarios WHERE id_receitas=?;", params);
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
    selectAllReceitaUsuario,
    deleteReceita,
    selectAllReceita,
    insertAvaliacao,
    selectAvaliacao,
    selectAvaliacaoUsuario,
    selectFiltro,
    insertCurtida,
    selectCurtida,
    selectAllCurtida,
    insertComentario,
    selectAllComentario
}