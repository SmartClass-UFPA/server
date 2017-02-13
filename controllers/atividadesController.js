const pg = require('pg');
const path = require('path');
var config = {
  user: 'smartclass', //env var: PGUSER
  database: 'smartclass', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database (IP do BD)
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// Adicionar Ementa
exports.addAtividade = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {data_entrega: req.body.data_entrega, materia: req.body.materia, tipo: req.body.tipo, info: req.body.info, semestre: req.body.semestre, turno: req.body.turno, n_curso: req.body.n_curso};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query( 'INSERT INTO atividades (data_entrega, materia, tipo, info, semestre, turno, n_curso) values ($1, $2, $3, $4, $5, $6, $7)',
    [data.data_entrega, data.materia, data.tipo, data.info, data.semestre, data.turno, data.n_curso]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM atividades ORDER BY data_entrega ASC');
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

// Ler as atividades cadastradas
exports.readAtividades = function(req, res, next) {
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
    const query = client.query('SELECT * FROM atividades WHERE materia=($1) ORDER BY id ASC;');
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

// Update atividades
exports.updateAtividades = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {data_entrega: req.body.data_entrega, materia: req.body.materia, tipo: req.body.tipo, info: req.body.info, semestre: req.body.semestre, turno: req.body.turno, n_curso: req.body.n_curso};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE atividades SET n_curso=($1), materia=($2), tipo=($3), info=($4), semestre=($5), turno=($6) WHERE data_entrega=($7)',
    [data.semestre, data.materia, data.assuntos, data.livros, data.ch, data.cod, data.n_curso]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM atividades ORDER BY data_entrega ASC");
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

//Delete Bike
exports.delAtividade = function(req, res, next) {
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
    client.query('DELETE FROM atividades WHERE n_curso=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM atividades ORDER BY n_curso ASC');
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
