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

// Adicionar Ementa
exports.addEmenta = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {n_curso: req.body.n_curso, semestre: req.body.semestre, materia: req.body.materia, assuntos: req.body.assuntos, livros: req.body.livros, ch: req.body.ch, cod: req.body.cod};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query( 'insert into ementas (n_curso, semestre, materia, assuntos, livros, ch, cod) values ($1, $2, $3, $4, $5, $6, $7)',
    [data.n_curso, data.semestre, data.materia, data.assuntos, data.livros, data.ch, data.cod]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ementas ORDER BY n_curso ASC');
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

// Ler Ementa de um Curso
exports.listarEmenta = function(req, res, next) {
  const results = [];
  const id_curso = req.params.n_curso;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ementas WHERE n_curso=($1);', [id_curso]);
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

// Ler Ementa de um Curso
exports.listarEmentas = function(req, res, next) {
  const results = [];
  const id_curso = req.params.n_curso;
  const id_semestre = req.params.semestre;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ementas WHERE n_curso=($1) AND semestre=($2);', [id_curso, id_semestre]);
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

// Ler Ementa de uma Materiaaaaaaaaa
exports.listarEmentaMateria = function(req, res, next) {
  const results = [];
  const id_curso = req.params.n_curso;
  const id_materia = req.params.materia;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM ementas WHERE n_curso=($1) AND materia=($2);', [id_curso, id_materia]);
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

// Update bike
exports.updateEmenta = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters and from http requester
  const data = {n_curso: req.body.n_curso, semestre: req.body.semestre, materia: req.body.materia, assuntos: req.body.assuntos, livros: req.body.livros, ch: req.body.ch, cod: req.body.cod};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE ementas SET semestre=($1), materia=($2), assuntos=($3), livros=($4), ch=($5), cod=($6) WHERE n_curso=($7)',
    [data.semestre, data.materia, data.assuntos, data.livros, data.ch, data.cod, data.n_curso]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM ementas ORDER BY n_curso ASC");
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
exports.delEmenta = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.n_curso;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM ementas WHERE n_curso=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM ementas ORDER BY n_curso ASC');
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

//Delete materia
exports.delEmentaMateria = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.n_curso;
  const id_materia = req.params.materia;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM ementas WHERE n_curso=($1) AND materia=($2)', [id, id_materia]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM ementas ORDER BY n_curso ASC');
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
