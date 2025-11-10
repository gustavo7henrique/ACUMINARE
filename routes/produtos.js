const express = require('express');
const rotas = express.Router();
const BD = require('../db');

//Listar Produtos (R - Read)
//Localhost:3000/produtos/listar ------- esse é a ROTA
rotas.get('/listar', async (req, res) => { 
    const busca = req.query.busca || ''; 
    const ordem = req.query.ordem || 'nome_produtos'; 

    //Buscando todos os PRODUTOS do Banco de Dados
    const dados = await BD.query(`SELECT * FROM produtos WHERE ativo = true and (nome_produto ilike $1 or nome_categoria $1) 
        order by ${ordem}`, 
        ['%'+ busca +'%']);
    console.log(dados.rows); //ele vai retornar um VETOR
    res.render('produtos/lista.ejs', { dadosProdutos: dados.rows }); //retornando em lista os Produtos
}); // ----- já esse por ultimo ele está BUSCANDO o ARQUIVO na pasta views/produtos


rotas.get('/novo', async (req, res) => {
    res.render('produtos/novo.ejs',  {dadosProdutos: dadosProdutos.rows})

});

rotas.post('/novo', async (req, res) => {
    const nome_produto = req.body.nome_produto;
    const foto = req.body.foto;
    const nome_marca = req.body.nome_marca;
    const preco_produto = req.body.preco_produto;
    const estoque_min = req.body.estoque_min;
    const estoque_atual = req.body.estoque_atual;
    const data_cadastro = req.body.data_cadastro;
    const nome_categoria = req.body.nome_categoria;
    
    const sql = `INSERT INTO produtos (nome_produto, foto, nome_marca, preco_produto, estoque_min, estoque_atual, data_cadastro, nome_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    await BD.query(sql, [nome_produto, foto, nome_marca, preco_produto, estoque_min, estoque_atual, data_cadastro, nome_categoria]) //Gravando no Banco de Dados

    res.redirect('/produtos/listar');

});

rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM produtos WHERE id_produto = $1`;
    const dados = await BD.query(sql, [id]);

    console.log(dados.rows[0]);


    res.render(`produtos/editar.ejs`, { produto: dados.rows[0] });
});

rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const foto = req.body.foto;
    const nome_produto = req.body.nome;
    const nome_marca = req.body.nome_marca;
    const preco_produto = req.body.preco_produto;
    const estoque_min = req.body.estoque_min;
    const estoque_atual = req.body.estoque_atual;
    const data_cadastro = req.body.data_cadastro;
    const nome_categoria = req.body.nome_categoria;
    
    

    //Inserindo os dados recebidos no BD
    const sql = `UPDATE produtos SET 
                   nome_produto = $1,
                   foto = $2,
                   marca_produto = $3,
                   preco_produto = $4,
                   estoque_min = $5,
                   estoque_atual = $6,
                   data_cadastro = $8
                   nome_categoria = $9
                   WHERE id_produto = $10`;
    await BD.query(sql, [nome_produto, foto, nome_marca, preco_produto, estoque_min, estoque_atual, data_cadastro, nome_categoria, id]);

    //Redirecionando para a página de lista de PRODUTOS
    res.redirect(`/produtos/listar`);

});


rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;

    const sql = `UPDATE alunos SET ativo = false WHERE id_aluno = $1`;
    //EXECUTANDO O COMANDO NO BD
    await BD.query(sql, [id]);

    res.redirect(`/alunos/listar`);

});

module.exports = rotas;