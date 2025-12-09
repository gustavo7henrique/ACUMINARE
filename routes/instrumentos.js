const express = require('express');
const rotas = express.Router();
const BD = require('../db')

//INSTRUMENTO DE CORDAS
rotas.get('/cordas', async (req, res) => {
  const busca = req.query.busca || '';
  const ordensPermitidas = {
    'az': 'nome_ins_corda ASC',
    'za': 'nome_ins_corda DESC'
  };

  const ordem = ordensPermitidas[req.query.ordem] || 'nome_ins_corda ASC';

  const dados = await BD.query(`SELECT *
      FROM cordas
      WHERE nome_ins_corda ILIKE $1
     order by ${ordem}`, [`%${busca}%`]);

  console.log(dados.rows);
  res.render('instrumentos/cordas.ejs', { dadosCordas: dados.rows });
});



//INSTRUMENTO DE METAIS
rotas.get('/metais', async (req, res) => {
  const busca = req.query.busca || '';
  const ordensPermitidas = {
    'az': 'nome_ins_metal ASC',
    'za': 'nome_ins_metal DESC'
  };

  const ordem = ordensPermitidas[req.query.ordem] || 'nome_ins_metal ASC';

  const dados = await BD.query(`SELECT *
      FROM metais
      WHERE nome_ins_metal ILIKE $1
     order by ${ordem}`, [`%${busca}%`]);

  console.log(dados.rows);
  res.render('instrumentos/metais.ejs', { dadosMetais: dados.rows });
});


//INSTRUMENTO DE PERCUSSÃO
rotas.get('/percussao', async (req, res) => {
  const busca = req.query.busca || '';
  const ordensPermitidas = {
    'az': 'nome_ins_percussao ASC',
    'za': 'nome_ins_percussao DESC'
  };

  const ordem = ordensPermitidas[req.query.ordem] || 'nome_ins_percussao ASC';

  const dados = await BD.query(`SELECT *
      FROM percussao
      WHERE nome_ins_percussao ILIKE $1
     order by ${ordem}`, [`%${busca}%`]);

  console.log(dados.rows);
  res.render('instrumentos/percussao.ejs', { dadosPercussao: dados.rows });
});

module.exports = rotas;