const mysql = require('mysql');
//variavel de conexão com o banco de dados
exports.db = mysql.createConnection({
    host: process.env.DATABASE_HOST,    
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});