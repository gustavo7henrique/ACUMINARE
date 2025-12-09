const express = require('express');
const rotas = express.Router();
const BD = require('../db')

rotas.get(`/listar`, async (req, res) => { //requisição //resposta
    const busca = req.query.busca || '';
    const ordensPermitidas = {
        'nome': 'nome_usuario_contato ASC',
        'e-mail': 'email_contato'
    };

    const ordem = ordensPermitidas[req.query.ordem] || 'nome_usuario_contato ASC';

    const pg = req.query.pg || 1; //Variavel que controlaa página atual
    const limite = 8; //quantidade de registros por pagina 
    const offset = (pg - 1) * limite; //Quantidade de registros a serem "pulados"

    const dados = await BD.query(`SELECT *, COUNT (*) OVER () AS total_mensagens
      FROM usuario_contato
      WHERE nome_usuario_contato ILIKE $1
      order by ${ordem}
        limit $2 offset $3`, 
        ['%'+ busca +'%', limite, offset]);

        console.log(dados.rows);
    
    const totalPgs = Math.ceil(dados.rows[0].total_mensagens / limite)

    res.render(`mensagens/lista.ejs`, { dadosMensagens: dados.rows,
        totalPgs : totalPgs,
            pgAtual : Number(pg),
            busca : busca,
            ordem : ordem
     });

});

//ROTA PARA O CONTATO - GRAVANDO MENSAGEM DO USUÁRIO NO BANCO DE DADOS
//gravando de usuários que não estão logados, mas que enviam a mensagem!!!

rotas.post('/listar', async (req, res) => {
    const nome_usuario_contato = req.body.nome_usuario_contato
    const email_contato = req.body.email_contato
    const mensagem = req.body.mensagem;

    const id_usuario = null;

    const data_mensagem = new Date().toISOString().split('T')[0];

    try {
        await BD.query(`
      INSERT INTO usuario_contato (id_usuario, nome_usuario_contato, email_contato, mensagem, data_mensagem)
      VALUES ($1, $2, $3, $4, $5)
    `, [id_usuario, nome_usuario_contato, email_contato, mensagem, data_mensagem]);

        res.redirect('/');

    } catch (erro) {
        console.log("🔥 ERRO NO INSERT 🔥");
        console.log("Mensagem:", erro.message);
        console.log("Detalhe:", erro.detail);
        console.log("Código:", erro.code);

        res.send("Erro ao enviar a mensagem.");
    }

});

//Criando rota EXCLUIR CATEGORIA passando o ID
rotas.post('/excluir/:id', async (req, res) => {
    //Recebendo o código que quero excluir 
    const id = req.params.id;

    //Comando SQL para excluir do BD
    //const sql = 'DELETE FROM turmas WHERE id_turma = $1';

    // A melhor prática ´desativar o item e não excluir
    const sql = 'DELETE FROM usuario_contato WHERE id_usuario_contato = $1';
    //Executando o comando no BD
    await BD.query(sql, [id]);

    //Redirecionando para a página listagens
    res.redirect('/mensagens/listar')

});

module.exports = rotas;