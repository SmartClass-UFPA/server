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

// Adicionar Horario
exports.addHorario = function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {semestre: req.body.semestre, turno: req.body.turno, materia1: req.body.materia1, materia2: req.body.materia2, materia3: req.body.materia3, n_curso: req.body.n_curso, dia_semana: req.body.dia_semana};
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO horarios_aula(semestre, turno, materia1, materia2, materia3, n_curso, dia_semana) values($1, $2, $3, $4, $5, $6, $7)',
    [data.semestre, data.turno, data.materia1, data.materia2, data.materia3, data.n_curso, data.dia_semana]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM horarios_aula ORDER BY n_curso ASC');
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

// Ler todos os Horarios
exports.listarHorarios = function(req, res, next) {
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
    const query = client.query('SELECT * FROM horarios_aula ORDER BY n_curso ASC;');
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


// Exibe Horario
exports.exibeHorario = function(req, res, next) {
  const results = [];
  const id = req.params.todo_id;
  const semes = req.params.semestre;
  const turn = req.params.turno;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT semestre, turno, dia_semana, materia1, materia2, materia3 FROM horarios_aula WHERE n_curso=($1) AND semestre=($2) AND turno=($3);', 
    [id, semes, turn]);
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

// Update Time
exports.atualizarHorario = function(req, res, next) {
  const results = [];
  const id = req.params.todo_id;
  const semes = req.params.semestre;
  const turn = req.params.turno;
  // Grab data from the URL parameters and from http requester
  const data = {semestre: semes, turno: turn, materia1: req.body.materia1, materia2: req.body.materia2, materia3: req.body.materia3, n_curso: id, dia_semana: req.body.dia_semana};

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE horarios_aula SET dia_semana=($1), materia1=($2), materia2=($3), materia3=($4) WHERE n_curso=($5) AND semestre=($6) AND turno=($7)',
    [data.dia_semana, data.materia1, data.materia2, data.materia3, data.n_curso, data.semestre, data.turno]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM horarios_aula ORDER BY n_curso ASC");
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

//Deletar um Horario
exports.delHorario = function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  const semes = req.params.semestre;
  const turn = req.params.turno;
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM horarios_aula WHERE n_curso=($1) AND semestre=($2) AND turno=($3)', [id, semes, turn]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM horarios_aula ORDER BY n_curso ASC');
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