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

// Adicionar Atividade
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
  const n_curso = req.params.n_curso;
  const semestre = req.params.semestre;
  const turno = req.params.turno;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM atividades WHERE n_curso=($1) AND semestre=($2) AND turno=($3) ORDER BY data_entrega ASC;', [n_curso,semestre,turno]);
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

// Ler as atividades cadastradas de uma matéria
exports.readAtividades = function(req, res, next) {
  const results = [];
  const n_curso = req.params.n_curso;
  const semestre = req.params.semestre;
  const turno = req.params.turno;
  const materia = req.params.materia;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM atividades WHERE n_curso=($1) AND semestre=($2) AND turno=($3) AND materia=($4) ORDER BY data_entrega ASC;', [n_curso,semestre,turno, materia]);
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
    client.query('UPDATE atividades SET tipo=($1), info=($2) WHERE n_curso=($3), semestre=($4), turno($5), materia=($6), data_entrega=($7);',
    [data.tipo, data.info, data.n_curso, data.semestre, data.turno, data.materia, data.data_entrega]);
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

//Delete Atividades da turma
exports.delAtividade = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const n_curso = req.params.n_curso;
  const semestre = req.params.semestre;
  const turno = req.params.turno;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM atividades WHERE n_curso=($1) AND semestre=($2) AND turno=($3);', [n_curso,semestre,turno]);
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

//Delete Atividades da materia
exports.delAtividade = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const n_curso = req.params.n_curso;
  const semestre = req.params.semestre;
  const turno = req.params.turno;
  const materia = req.params.materia;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM atividades WHERE n_curso=($1) AND semestre=($2) AND turno=($3) AND materia=($4);', [n_curso,semestre,turno,materia]);
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

//Delete uma Atividade da materia
exports.delAtividade = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const data = {data_entrega: req.body.data_entrega, materia: req.body.materia, semestre: req.body.semestre, turno: req.body.turno, n_curso: req.body.n_curso};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM atividades WHERE n_curso=($1) AND semestre=($2) AND turno=($3) AND materia=($4) AND data_entrega=($5);', [data.n_curso,data.semestre,data.turno,data.materia, data.data_entrega]);
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
