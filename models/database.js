
var pg = require('pg');
var config = {
  user: 'smartclass', //env var: PGUSER
  database: 'smartclass', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database POR ALGUM MOTIVO A PORTA DO LOCALHOST N TAVA FUNCIONANDO
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var createTableEmentas = function() {
  const client = new pg.Client(config);

  //making table for users
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS ementas(n_curso INTEGER PRIMARY KEY, semestre INTEGER NOT NULL, materia VARCHAR(40) NOT NULL UNIQUE, assuntos TEXT, livros TEXT, ch INTEGER, cod VARCHAR(10))');
  query.on('end', () => { client.end(); console.log("Tabela ementas criada com sucesso\n");});
};

var createTableAtividades = function() {
  const client = new pg.Client(config);

  //making table for bikes
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS atividades(data_entrega DATE NOT NULL, materia VARCHAR(40) NOT NULL,FOREIGN KEY (materia) REFERENCES ementas (materia), tipo VARCHAR(1) NOT NULL, info TEXT, semestre INTEGER NOT NULL, turno VARCHAR(1),n_curso INTEGER NOT NULL,FOREIGN KEY (n_curso) REFERENCES ementas (n_curso))');
  query.on('end', () => { client.end(); console.log("Tabela atividades criada com sucesso\n");});
};

var createTableStations = function() {
  const client = new pg.Client(config);

  //making table for station
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS stations(id_station INT NOT NULL, name VARCHAR(45) NULL, qnt_slots INT NOT NULL, adress TEXT NOT NULL, connected BIT NULL, PRIMARY KEY (id_station))');
  query.on('end', () => { client.end(); console.log("Tabela stations criada com sucesso\n"); });
};

var createTableLoans = function() {
  const client = new pg.Client(config);

  //making table for loans
  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS loans(id_loan INT NOT NULL, date DATE NOT NULL, time TIME NOT NULL, type VARCHAR(1) NOT NULL, PRIMARY KEY (id_loan), CONSTRAINT loan_user FOREIGN KEY (id_loan) REFERENCES users (id_user) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT loan_station FOREIGN KEY (id_loan) REFERENCES stations (id_station) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT loan_bike FOREIGN KEY (id_loan) REFERENCES bikes (id_bike) ON DELETE NO ACTION ON UPDATE NO ACTION)');
  query.on('end', () => { client.end(); console.log("Tabela emprestimo criada com sucesso\n");});
};
createTableEmentas();
createTableAtividades();
createTableBikes();
createTableLoans();
