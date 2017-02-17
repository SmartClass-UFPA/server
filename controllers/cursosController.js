const pg = require('pg');
const path = require('path');
var config = {
  user: 'smartclass', //env var: PGUSER
  database: 'smartclass', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.3', // Server hosting the postgres database (IP do BD)
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// Adicionar curso
exports.addCurso = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {n_curso: req.body.n_curso, nome: req.body.nome, ano: req.body.ano, enade: req.body.enade, guia_estudante: req.body.guia_estudante, descricao: req.body.descricao};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO cursos(n_curso, nome, ano_criacao, enade, guia_estudante, descricao) values($1, $2, $3, $4, $5, $6)',
    [data.n_curso, data.nome, data.ano, data.enade, data.guia_estudante, data.descricao]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cursos ORDER BY n_curso ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Ler todos os cursos
exports.listarCursos = function(req, res, next) {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cursos ORDER BY n_curso ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Ler um curso
exports.listarCurso = function(req, res, next) {
  const results = [];
  const id = req.params.todo_id;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cursos WHERE n_curso=($1);', [id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Atualizar curso
exports.atualizarCurso = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {n_curso: req.params.todo_id, nome: req.body.nome, ano: req.body.ano, enade: req.body.enade, guia_estudante: req.body.guia_estudante, descricao: req.body.descricao};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE cursos SET nome=($1), ano_criacao=($2), enade=($3), guia_estudante=($4), descricao=($5) WHERE n_curso=($6)',
    [data.nome, data.ano, data.enade, data.guia_estudante, data.descricao, data.n_curso]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM cursos ORDER BY n_curso ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
}

//Deletar um curso
exports.delCurso = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM cursos WHERE n_curso=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM cursos ORDER BY n_curso ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}