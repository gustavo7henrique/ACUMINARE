//ESTRUTURANDO O SERVIDOR

const express = require('express'); 
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set(`views`, path.join(__dirname, `views`)); //configura a página das views
app.set(`view engine`, `ejs`);
app.use(express.static(path.join(__dirname,`public`))); //esse path = busque o caminho/pasta onde está os arquivos
app.use(express.urlencoded({extended: true})) //Para processar e receber dados do formulário
app.use(express.json()) //Para utilizar dados em formato JSON

//Rota da página principal "Landing Page" - exemplo: "google.com" "globo.com"
app.get(`/`, (req, res) =>{ //requisição //resposta
    res.render(`landing/index`); //buscará o arquivos index.ejs nas pasta views/landing
}) 

//Importando as rotas do admin
const adminRotas = require('./routes/admin')
app.use('/admin', adminRotas); //Todas as rotas do admin começam com /admin

//Importando as rotas de Produtos
const produtosRotas = require('./routes/produtos') //Busca do arquivo routes/produtos/js
app.use('/produtos', produtosRotas);

//Importando as rotas de Categorias
const categoriasRotas = require('./routes/categorias') //Busca do arquivo routes/categoriass/js
app.use('/categorias', categoriasRotas);

//Importando as rotas de Usuários
const usuariosRotas = require('./routes/usuarios') //Busca do arquivo routes/usuarios/js
app.use('/usuarios', usuariosRotas);

//Importando as rotas de Movimentações
const movimentacoesRotas = require('./routes/movimentacoes') //Busca do arquivo routes/movimentacoes/js
app.use('/movimentacoes', movimentacoesRotas);



const porta = 3000;
app.listen(porta, () => (
    console.log(`Servidor rodando em http://192.168.0.232:${porta}`)
))
