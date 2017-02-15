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

// Adicionar Sala
exports.addSala = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {local: req.body.local, nome_sala: req.body.nome_sala};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query( 'INSERT INTO sala (local,nome_sala) values ($1, $2)',
    [data.local, data.nome_sala]);
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Ler as Salas cadastradas
//----------------- Preciso Alterar quando entender melhor -------------------
exports.readSala = function(req, res, next) {
  const results = [];
  //Pegar Informações
  const data = {nome_sala: req.body.nome_sala, local: req.body.local}
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM local=($2) WHERE nome_sala=($1) ASC;', [nome_sala, local]);
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

//Delete Sala
//----------------------Testar Veracidade--------------
exports.delSala = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const data = {nome_sala: req.body.nome_sala, local: req.body.local}
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM local=($1) WHERE nome_sala=($2)', [local,nome_sala]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM local=($1) ORDER BY nome_sala ASC', [local]);
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
