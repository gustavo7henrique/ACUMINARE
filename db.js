const { Pool } = require('pg');

const BD = new Pool(
    {
        user: 'postgres', //usuário cadastrado no banco de dados
        host: 'localhost', //Endereço do servidor do BD
        database: '_2025_acuminare', //Nomedo BD a ser conectado
        password: 'admin', //Senha do usuário
        port: 5432, //Porta de conexão

    }
);

module.exports = BD;