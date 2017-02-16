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
    client.query( 'INSERT INTO salas (local,nome_sala) values ($1, $2)',
    [data.local, data.nome_sala]);
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// Mostra Sala
exports.readSala = function(req, res, next) {
  const results = [];
  const local = req.params.local;
  const nome_sala = req.params.nome_sala;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * WHERE local=($1) AND nome_sala=($2)', [local, nome_sala]);
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
exports.delSala = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const nome_sala = req.params.nome_sala;
  const local = req.params.local;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM salas WHERE local=($1) AND nome_sala=($2)', [local,nome_sala]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM salas ORDER BY nome_sala ASC');
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

//Pegar Temperatura da Sala
//---------------------Verificar Variável de temperatura---------------------
exports.readTempSala = function(req, res, next) {
  const results = [];
  const local = req.params.local;
  const nome_sala = req.params.nome_sala;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT temp WHERE local=($1) AND nome_sala=($2)', [local, nome_sala]);
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

//Altera Valor da Temperatura
exports.updateTemp= function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {local: req.body.local, nome_sala: req.body.nome_sala, temp: req.body.temp};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE salas SET temp=($1) WHERE local=($2) AND nome_sala=($3)',
    [data.temp, data.local, data.nome_sala]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM salas ORDER BY nome_sala ASC");
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

//Chuva
//-------------------------------Verificar Variável Chuva-------------
exports.readChuvaSala = function(req, res, next) {
  const results = [];
  const local = req.params.local;
  const nome_sala = req.params.nome_sala;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT chuva WHERE local=($1) AND nome_sala=($2)', [local, nome_sala]);
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

//Update Chuva
exports.updateChuva= function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {local: req.body.local, nome_sala: req.body.nome_sala, chuva: req.body.chuva};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE salas SET chuva=($1) WHERE local=($2) AND nome_sala=($3)',
    [data.chuva, data.local, data.nome_sala]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM salas ORDER BY nome_sala ASC");
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

//Status Professor
//---------------------Fazer-----------------------
exports.readStatus = function(req, res, next) {
  const results = [];
  const local = req.params.local;
  const nome_sala = req.params.nome_sala;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT status WHERE local=($1) AND nome_sala=($2)', [local, nome_sala]);
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

//Update Status
exports.updateStatus= function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {local: req.body.local, nome_sala: req.body.nome_sala, status: req.body.status};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE salas SET status=($1) WHERE local=($2) AND nome_sala=($3)',
    [data.chuva, data.local, data.nome_sala]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM salas ORDER BY nome_sala ASC");
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
