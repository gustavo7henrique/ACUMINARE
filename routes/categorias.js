const express = require('express');
const rotas = express.Router();
const BD = require('../db')

// Listar (R - read)
rotas.get('/listar', async (req, res) => {
    //Armazenando o valor do campo de busca em uma variavel
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'nome_categoria';

    const dados = await BD.query(`SELECT * FROM categorias 
        WHERE categorias.categoria_ativa = true 
        and nome_categoria
        ilike $1 
        order by ${ordem}`, [`%${busca}%`]);

    console.log(dados.rows);
    res.render('categorias/lista.ejs', {dadosCategorias: dados.rows});
});

//Criar rota NOVO 
rotas.get('/novo', async (req, res) => {
    res.render('categorias/novo.ejs');
});

rotas.post('/novo', async (req, res) => {
    //Obtendo os dados do formulário 
    const nome_categoria = req.body.nome_categoria;

    //Inserindo os dados recebidos no BD
    const sql = `INSERT INTO categorias (nome_categoria)
                    VALUES ($1)`;

    await BD.query(sql, [nome_categoria]);

    res.redirect('/categorias/listar')

});

//Criando rota EXCLUIR CATEGORIA passando o ID
rotas.post('/excluir/:id', async (req, res) => {
    //Recebendo o código que quero excluir 
    const id = req.params.id;

    //Comando SQL para excluir do BD
    //const sql = 'DELETE FROM turmas WHERE id_turma = $1';

    // A melhor prática ´desativar o item e não excluir
    const sql = 'UPDATE categorias SET categoria_ativa = false WHERE id_categoria = $1';
    //Executando o comando no BD
    await BD.query(sql, [id]);

    //Redirecionando para a página listagens
    res.redirect('/categorias/listar')

});

//Criar rota para EDITAR CATEGORIA
rotas.get('/editar/:id', async (req, res) => {
    //Recebendo o código que quero excluir
    const id = req.params.id

    const sql = 'SELECT * FROM categorias WHERE id_categoria = $1';
    const dados = await BD.query(sql, [id]);

    console.log(dados.rows[0]);
    
    res.render('categorias/editar.ejs', {categoria: dados.rows[0]});
});

rotas.post('/editar/:id', async (req, res) => {

    const id = req.params.id;

    //Obtendo os dados do formulário 
    const nome_categoria = req.body.nome_categoria;

    //Inserindo os dados recebidos no BD
    const sql = ` UPDATE categorias SET
                       nome_categoria = $1
                    WHERE id_categoria = $2`;
                    

    await BD.query(sql, [nome_categoria, id]);

    res.redirect('/categorias/listar')

});

module.exports = rotas;