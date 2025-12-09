const express = require('express');
const rotas = express.Router();
const BD = require('../db');

//Listar Produtos (R - Read)
//Localhost:3000/produtos/listar ------- esse é a ROTA
rotas.get('/listar', async (req, res) => { 
    const busca = req.query.busca || ''; 
    const ordem = req.query.ordem || 'nome_produto'; 

    const pg = req.query.pg || 1; //Variavel que controlaa página atual
    const limite = 8; //quantidade de registros por pagina 
    const offset = (pg - 1) * limite; //Quantidade de registros a serem "pulados"

    //Buscando todos os PRODUTOS do Banco de Dados
    const dados = await BD.query(`SELECT *, COUNT (*) OVER () AS total_items FROM produtos
        LEFT JOIN categorias ON produtos.id_categoria = categorias.id_categoria
        WHERE produtos.produto_ativo = true 
        and (nome_produto ilike $1 or nome_categoria ilike $1) 
        order by ${ordem}
        limit $2 offset $3`, 
        ['%'+ busca +'%', limite, offset]);

    console.log(dados.rows); //ele vai retornar um VETOR

    const totalPgs = Math.ceil(dados.rows[0].total_items / limite)

    res.render('produtos/lista.ejs', { dadosProdutos: dados.rows, 
        totalPgs : totalPgs,
            pgAtual : Number(pg),
            busca : busca,
            ordem : ordem
    }); //retornando em lista os Produtos
}); // ----- já esse por ultimo ele está BUSCANDO o ARQUIVO na pasta views/produtos


rotas.get('/novo', async (req, res) => {
    const dadosCategorias = await BD.query('SELECT * FROM categorias WHERE categoria_ativa = true ORDER BY nome_categoria');
    res.render('produtos/novo.ejs', {dadosCategorias: dadosCategorias.rows} )

});

rotas.post('/novo', async (req, res) => {
    const nome_produto = req.body.nome_produto;
    const imagem = req.body.imagem;
    const marca_produto = req.body.marca_produto;
    const preco_produto = req.body.preco_produto;
    const estoque_min = req.body.estoque_min;
    const estoque_atual = req.body.estoque_atual;
    const data_cadastro = new Date().toISOString().split('T')[0];;
    const id_categoria = req.body.id_categoria;
    
    
    const sql = `INSERT INTO produtos (nome_produto, imagem, marca_produto, preco_produto, estoque_min, estoque_atual, data_cadastro, id_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    await BD.query(sql, [nome_produto, imagem, marca_produto, preco_produto, estoque_min, estoque_atual, data_cadastro, id_categoria]) //Gravando no Banco de Dados

    res.redirect('/produtos/listar');

});

rotas.get('/editar/:id', async (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM produtos WHERE id_produto = $1`;
    const dados = await BD.query(sql, [id]);

    const produto = dados.rows[0];

    // ✅ Corrige só a data
    if (produto.data_cadastro) {
        produto.data_cadastro = produto.data_cadastro.toISOString().split('T')[0];
    }

    console.log(dados.rows[0]);

    const dadosCategorias = await BD.query(`
        SELECT id_categoria, nome_categoria FROM categorias
        WHERE categoria_ativa = true
        ORDER BY nome_categoria`);

    res.render(`produtos/editar.ejs`, { produto: dados.rows[0], dadosCategorias: dadosCategorias.rows });
});

rotas.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const imagem = req.body.imagem;
    const nome_produto = req.body.nome_produto;
    const marca_produto = req.body.marca_produto;
    const preco_produto = req.body.preco_produto;
    const estoque_min = req.body.estoque_min;
    const estoque_atual = req.body.estoque_atual;
    const data_cadastro = req.body.data_cadastro;
    const id_categoria = req.body.id_categoria;
    
    

    //Inserindo os dados recebidos no BD
    const sql = `UPDATE produtos SET 
                   nome_produto = $1,
                   imagem = $2,
                   marca_produto = $3,
                   preco_produto = $4,
                   estoque_min = $5,
                   estoque_atual = $6,
                   data_cadastro = $7,
                   id_categoria = $8
                   WHERE id_produto = $9`;
    await BD.query(sql, [nome_produto, imagem, marca_produto, preco_produto, estoque_min, estoque_atual, data_cadastro, id_categoria, id]);

    //Redirecionando para a página de lista de PRODUTOS
    res.redirect(`/produtos/listar`);

});


rotas.post('/excluir/:id', async (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE produtos SET produto_ativo = false WHERE id_produto = $1`;
    
    //EXECUTANDO O COMANDO NO BD
    await BD.query(sql, [id]);

    res.redirect(`/produtos/listar`);

});

module.exports = rotas;