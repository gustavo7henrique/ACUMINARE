const express = require('express');
const rotas = express.Router();
const BD = require('../db')

// Listar entradas e saídas (R - read)
rotas.get('/listar', async (req, res) => {
    const id = req.params.id
    //Armazenando o valor do campo de busca em uma variavel
    const busca = req.query.busca || '';
    const ordem = req.query.ordem || 'id_movimentacao DESC';

    const pg = req.query.pg || 1; //Variavel que controlaa página atual
    const limite = 8; //quantidade de registros por pagina 
    const offset = (pg - 1) * limite; //Quantidade de registros a serem "pulados"

    const dados = await BD.query(`SELECT *, COUNT (*) OVER () AS total_movimentacoes FROM movimentacoes 
                LEFT JOIN usuarios on movimentacoes.id_usuario = usuarios.id_usuario
                LEFT JOIN produtos on movimentacoes.id_produto = produtos.id_produto
                LEFT JOIN categorias ON produtos.id_categoria = categorias.id_categoria
                WHERE categorias.categoria_ativa = true
                and (tipo_movimentacao ilike $1  or nome_usuario ilike $1 or nome_produto ilike $1 )
                order by ${ordem}
        limit $2 offset $3`, 
        ['%'+ busca +'%', limite, offset]);

    console.log(dados.rows);
    
    const totalPgs = Math.ceil(dados.rows[0].total_movimentacoes / limite)

    res.render('movimentacoes/lista.ejs', { dadosMovimentacoes: dados.rows, 
        totalPgs : totalPgs,
            pgAtual : Number(pg),
            busca : busca,
            ordem : ordem
    }); //retornando em lista os Produtos
});

//Criar rota NOVO 
rotas.get('/novo', async (req, res) => {
    //Buscando Usuarios e Produtos para alimentar select da tela 
    const dadosProdutos = await BD.query(`
        SELECT id_produto, nome_produto FROM produtos
        WHERE produto_ativo = true
        ORDER BY nome_produto`)

    const dadosUsuarios = await BD.query(`
        SELECT id_usuario, nome_usuario FROM usuarios
        WHERE usuario_ativo = true
        ORDER BY nome_usuario`)


    res.render('movimentacoes/novo.ejs', { dadosUsuarios: dadosUsuarios.rows, dadosProdutos: dadosProdutos.rows })
});

rotas.post('/novo', async (req, res) => {
    // 1. Obtendo os dados do formulário 
    const tipo_movimentacao = req.body.tipo_movimentacao;
    // O campo quantidade vem como string do formulário, converta para número
    const quantidade = Number(req.body.quantidade);
    const data_movimentacao =  new Date().toISOString().split('T')[0] ;
    const id_usuario = req.body.id_usuario;
    const id_produto = req.body.id_produto;

    // --- NOVO PASSO 1: Buscar o estoque atual do produto ---
    const produtoResult = await BD.query(
        'SELECT estoque_atual FROM produtos WHERE id_produto = $1',
        [id_produto]
    );

    const estoque_antigo = produtoResult.rows[0].estoque_atual;
    let novo_estoque;

    // --- NOVO PASSO 2: Calcular o novo estoque ---
    if (tipo_movimentacao === 'entrada') {
        novo_estoque = estoque_antigo + quantidade;
    } else if (tipo_movimentacao === 'saida') {
        // Você pode adicionar uma verificação aqui para garantir que o estoque não fique negativo
        if (estoque_antigo < quantidade) {
            // Em um sistema real, você redirecionaria com uma mensagem de erro
            console.error("Erro: Estoque insuficiente para esta saída.");
            return res.redirect('/movimentacoes/novo?erro=estoque_insuficiente'); 
        }
        novo_estoque = estoque_antigo - quantidade;
    } else {
        // Tratar caso de tipo_movimentacao inválido
        return res.status(400).send('Tipo de movimentação inválido.');
    }


    // 3. Inserindo os dados recebidos no BD na tabela MOVIMENTACOES
    // NOTA: O campo 'novo_estoque' na movimentação deve registrar o estoque APÓS essa operação.
    const sqlMovimentacao = `
        INSERT INTO MOVIMENTACOES ( tipo_movimentacao, quantidade, novo_estoque, data_movimentacao, id_usuario, id_produto)
        VALUES ($1, $2, $3, $4, $5, $6)`;

    await BD.query(sqlMovimentacao, [tipo_movimentacao, quantidade, novo_estoque, data_movimentacao, id_usuario, id_produto]);

    // --- NOVO PASSO 4: Atualizar o estoque do produto na tabela PRODUTOS ---
    const sqlAtualizaProduto = `
        UPDATE produtos SET estoque_atual = $1 WHERE id_produto = $2`;

    await BD.query(sqlAtualizaProduto, [novo_estoque, id_produto]);

    res.redirect('/movimentacoes/listar')

});



module.exports = rotas;