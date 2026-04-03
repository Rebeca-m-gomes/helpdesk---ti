const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.json());

// servir HTML
app.use(express.static(__dirname));

// banco
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) console.error(err);
  else console.log("Banco conectado 🚀");
});

// rota teste
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API
app.post('/chamados', (req, res) => {
  const { titulo, descricao } = req.body;

  db.query(
    'INSERT INTO chamados (titulo, descricao) VALUES (?, ?)',
    [titulo, descricao],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Chamado criado ✅");
    }
  );
});

app.get('/chamados', (req, res) => {
  db.query('SELECT * FROM chamados', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando 🚀"));