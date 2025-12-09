//ESTRUTURANDO O SERVIDOR

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const BD = require('./db.js')

const session = require('express-session');
app.use(session({
    secret: 'sesisenai',
    resave: false,
    saveUninitialized: false
}))


const verificarAutenticacao = (req, res, next) => {
    if (req.session.nome_usuario) {
        res.locals.nome_usuario = req.session.usuario || null;
        next();
    } else {
        res.redirect('/admin/login');
    }
}


app.set(`views`, path.join(__dirname, `views`)); //configura a página das views
app.set(`view engine`, `ejs`);
app.use(express.static(path.join(__dirname, `public`))); //esse path = busque o caminho/pasta onde está os arquivos
app.use(express.urlencoded({ extended: true })); //Para processar e receber dados do formulário
app.use(express.json()); //Para utilizar dados em formato JSON



//Rota da página principal "Landing Page" - exemplo: "google.com" "globo.com"
app.get(`/`, (req, res) => { //requisição //resposta
    res.render(`landing/index`); //buscará o arquivos index.ejs nas pasta views/landing
});


//AQUI TEM OS GRÁFICOS
app.get('/admin', verificarAutenticacao, async (req, res) => {

    const qProdutos = await BD.query(`SELECT COUNT(*) AS total_produtos FROM produtos WHERE produto_ativo = true`);
    const qUsuarios = await BD.query(`SELECT COUNT(*) AS total_usuarios FROM usuarios WHERE usuario_ativo = true`);
    const qMovimentacoes = await BD.query(`SELECT COUNT(*) AS total_movimentacoes FROM movimentacoes`);
    const qProdutosEstoque = await BD.query(`SELECT SUM(estoque_atual) AS total_estoque FROM produtos WHERE produto_ativo = true`);


    // Gráfico 1: instrumentos
    const qInstrumentos = await BD.query(`
        SELECT p.nome_produto, c.nome_categoria, p.estoque_atual
        FROM produtos AS p
        INNER JOIN categorias AS c ON p.id_categoria = c.id_categoria
        WHERE p.produto_ativo = TRUE
        ORDER BY p.nome_produto
        `);

    // Gráfico 2: categorias
    const qCategorias = await BD.query(`
        SELECT c.nome_categoria, COUNT(p.id_produto) AS qtd_produtos
        FROM categorias AS c
        LEFT JOIN produtos AS p ON c.id_categoria = p.id_categoria
        WHERE c.categoria_ativa = TRUE
        GROUP BY c.nome_categoria
        ORDER BY c.nome_categoria
        `);

    //TABELA 
    const qprodutosEstoqueBaixo = await BD.query(`
            SELECT p.nome_produto, c.nome_categoria, p.estoque_atual, p.estoque_min
            FROM produtos AS p
            INNER JOIN categorias AS c ON p.id_categoria = c.id_categoria
            WHERE p.estoque_atual < p.estoque_min
            AND p.produto_ativo = TRUE
            ORDER BY p.nome_produto
            `);


    //buscará o arquivo dashboard.ejs na pasta views/admin
    res.render('admin/dashboard', {
        total_produtos: qProdutos.rows[0].total_produtos,
        total_usuarios: qUsuarios.rows[0].total_usuarios,
        total_movimentacoes: qMovimentacoes.rows[0].total_movimentacoes,
        total_estoque: qProdutosEstoque.rows[0].total_estoque,
        instrumentos: qInstrumentos.rows,
        categorias: qCategorias.rows,
        produtosEstoqueBaixo: qprodutosEstoqueBaixo.rows
    })
});


//Importando as rotas do admin
const adminRotas = require('./routes/admin')
app.use('/admin', adminRotas); //Todas as rotas do admin começam com /admin

//Importando as rotas de Produtos
const produtosRotas = require('./routes/produtos') //Busca do arquivo routes/produtos/js
app.use('/produtos', verificarAutenticacao, produtosRotas);

//Importando as rotas de Categorias
const categoriasRotas = require('./routes/categorias') //Busca do arquivo routes/categoriass/js
app.use('/categorias', verificarAutenticacao, categoriasRotas);

//Importando as rotas de Usuários
const usuariosRotas = require('./routes/usuarios') //Busca do arquivo routes/usuarios/js
app.use('/usuarios', verificarAutenticacao, usuariosRotas);

// //Importando as rotas de Movimentações
const movimentacoesRotas = require('./routes/movimentacoes') //Busca do arquivo routes/movimentacoes/js
app.use('/movimentacoes', verificarAutenticacao, movimentacoesRotas);

//Importando as rotas instrumentos
const instrumentosRotas = require('./routes/instrumentos')
app.use('/instrumentos', instrumentosRotas);

//Importando as rotas mensagens 
const mensagensRotas = require('./routes/mensagens')
app.use('/mensagens', verificarAutenticacao, mensagensRotas);

const porta = 3000;
app.listen(porta, () => (
    console.log(`Servidor rodando em http://192.168.0.151:${porta}`)
));


