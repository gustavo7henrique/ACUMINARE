const express = require('express');
const rotas = express.Router();
const BD = require('../db')


// //Rota para o painel administrativo 
// rotas.get('/', (req, res) => {
//     res.render('admin/dashboard')
// });


//ÁREA DE LOGIN !!!!!!!!!!! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
rotas.get('/login', (req, res) => {
    //buscará o arquivo login.ejs na pasta views/admin
    res.render('admin/login.ejs')
});

rotas.post('/login', async (req, res) => {
    //Pegar os valores que colocamos no BC 
    const email = req.body.email;
    const senha = req.body.senha; 
    
    const sql = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
    const dados = await BD.query(sql, [email, senha])

    if (dados.rows.length == 0){
        res.render('admin/login', {mensagem: 'Email ou senha Incorretos ❌'});

    } else {
        req.session.nome_usuario = dados.rows[0];
        res.redirect('/admin');

    }


})

rotas.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');

});





module.exports = rotas;