const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// conexão com banco (Railway)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// conectar
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Banco conectado 🚀");
  }
});

// rota teste
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// criar chamado
app.post('/chamados', (req, res) => {
  const { titulo, descricao } = req.body;

  const sql = 'INSERT INTO chamados (titulo, descricao) VALUES (?, ?)';
  
  db.query(sql, [titulo, descricao], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Chamado criado ✅");
    }
  });
});

// listar chamados
app.get('/chamados', (req, res) => {
  db.query('SELECT * FROM chamados', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// porta Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});