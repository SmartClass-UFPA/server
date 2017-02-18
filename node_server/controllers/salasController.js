const pg = require('pg');
const path = require('path');
var config = {
  user: 'smartclass', //env var: PGUSER
  database: 'smartclass', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: 'sc_bd', // Server hosting the postgres database (IP do BD)
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// Adicionar Sala
exports.addSala = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {local: req.body.local, sala: req.body.sala};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query( 'INSERT INTO salas (local,sala) values ($1, $2)',[data.local, data.sala]);
    // After all data is returned, close connection and return results

    const query = client.query('SELECT * FROM salas ORDER BY local ASC');

    query.on('row', (row) => {
      results.push(row);
    });

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
  const sala = req.params.sala;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM salas WHERE local=($1) AND sala=($2)', [local, sala]);
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
  const sala = req.params.sala;
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
    client.query('DELETE FROM salas WHERE local=($1) AND sala=($2)', [local,sala]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM salas ORDER BY sala ASC');
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


//Status Professor
//Update Status
exports.updateStatus= function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {local: req.params.local, sala: req.params.sala, status: req.params.status};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE salas SET prof_em_sala=($1) WHERE local=($2) AND sala=($3)',
    [data.status, data.local, data.sala]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM salas ORDER BY local ASC");
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
