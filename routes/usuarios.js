const express = require('express');
const rotas = express.Router();
const BD = require('../db')

// Criando Rotas de Listar (R - read)
rotas.get('/listar', async (req, res) => {
    //Armazenando o valor do campo de busca em uma variavel
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'nome_usuario';

    const pg = req.query.pg || 1; //Variavel que controlaa página atual
    const limite = 6; //quantidade de registros por pagina 
    const offset = (pg - 1) * limite; //Quantidade de registros a serem "pulados"

    // const dados = await BD.query(`SELECT * FROM usuarios 
    //     WHERE usuarios.usuario_ativo = true and nome_usuario ilike $1 
    //     order by ${ordem}`, 
    //     [`%${busca}%`]);

    const dados = await BD.query(`SELECT *, COUNT (*) OVER () AS total_usuarios FROM usuarios
        WHERE usuarios.usuario_ativo = true 
        and (nome_usuario ilike $1) 
        order by ${ordem}
        limit $2 offset $3`, 
        ['%'+ busca +'%', limite, offset]);

    console.log(dados.rows);

    const totalPgs = Math.ceil(dados.rows[0].total_usuarios / limite)

    res.render('usuarios/lista.ejs', { dadosUsuarios: dados.rows, 
        totalPgs : totalPgs,
            pgAtual : Number(pg),
            busca : busca,
            ordem : ordem
    }); //retornando em lista os Produtos
});

//Criar rota NOVO 
rotas.get('/novo', async (req, res) => {
    res.render('usuarios/novo.ejs');
});

rotas.post('/novo', async (req, res) => {
    //Obtendo os dados do formulário 
    const nome_usuario = req.body.nome_usuario;
    const senha = req.body.senha;
    const email = req.body.email;
    const endereco = req.body.endereco;

    //Inserindo os dados recebidos no BD
    const sql = `INSERT INTO usuarios (nome_usuario, senha, email, endereco)
                    VALUES ($1, $2, $3, $4)`;

    await BD.query(sql, [nome_usuario, senha, email, endereco]);

    res.redirect('/usuarios/listar')

});

//Criando rota EXCLUIR CATEGORIA passando o ID
rotas.post('/excluir/:id', async (req, res) => {
    //Recebendo o código que quero excluir 
    const id = req.params.id;

    //Comando SQL para excluir do BD
    //const sql = 'DELETE FROM usuarios WHERE id_usuario = $1';

    // A melhor prática ´desativar o item e não excluir
    const sql = 'UPDATE usuarios SET usuario_ativo = false WHERE id_usuario = $1';
    //Executando o comando no BD
    await BD.query(sql, [id]);

    //Redirecionando para a página listagens
    res.redirect('/usuarios/listar')

});

//Criar rota para EDITAR USUÁRIOS
rotas.get('/editar/:id', async (req, res) => {
    //Recebendo o código que quero excluir
    const id = req.params.id

    const sql = 'SELECT * FROM usuarios WHERE id_usuario = $1';
    const dados = await BD.query(sql, [id]);

    console.log(dados.rows[0]);
    
    res.render('usuarios/editar.ejs', {usuario: dados.rows[0]});
});

rotas.post('/editar/:id', async (req, res) => {

    const id = req.params.id;

    //Obtendo os dados do formulário 
    const nome_usuario = req.body.nome_usuario;
    const senha = req.body.senha;
    const email = req.body.email;
    const endereco = req.body.endereco;

    //Inserindo os dados recebidos no BD
    const sql = ` UPDATE usuarios SET 
                       nome_usuario = $1,
                       senha = $2, 
                       email = $3, 
                       endereco = $4
                    WHERE id_usuario = $5`;
                    

    await BD.query(sql, [nome_usuario, senha, email, endereco, id]);

    res.redirect('/usuarios/listar')

});

module.exports = rotas;