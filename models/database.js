
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

var createTableCursos = function() {
  const client = new pg.Client(config);

  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS cursos(n_curso INTEGER PRIMARY KEY NOT NULL, nome VARCHAR(30) NOT NULL, ano_criacao INTEGER NOT NULL, enade INTEGER NOT NULL, guia_estudante INTEGER, descricao VARCHAR(2000))');
  query.on('end', () => { client.end(); console.log("Tabela cursos criada com sucesso\n");});
};

var createTableEmentas = function() {
  const client = new pg.Client(config);

  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS ementas(n_curso INTEGER PRIMARY KEY, semestre INTEGER NOT NULL, materia VARCHAR(40) NOT NULL UNIQUE, assuntos TEXT, livros TEXT, ch INTEGER, cod VARCHAR(10))');
  query.on('end', () => { client.end(); console.log("Tabela ementas criada com sucesso\n");});
};

var createTableAtividades = function() {
  const client = new pg.Client(config);

  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS atividades(data_entrega DATE NOT NULL, materia VARCHAR(40) NOT NULL,FOREIGN KEY (materia) REFERENCES ementas (materia), tipo VARCHAR(1) NOT NULL, info TEXT, semestre INTEGER NOT NULL, turno VARCHAR(1),n_curso INTEGER NOT NULL,FOREIGN KEY (n_curso) REFERENCES ementas (n_curso))');
  query.on('end', () => { client.end(); console.log("Tabela atividades criada com sucesso\n");});
};

var createTableHorariosAula = function() {
  const client = new pg.Client(config);

  client.connect();
  query = client.query('CREATE TABLE IF NOT EXISTS horarios_aula(semestre INTEGER NOT NULL, turno VARCHAR(1) NOT NULL,materia1 VARCHAR(40), materia2 VARCHAR(40), materia3 VARCHAR(40), n_curso INTEGER NOT NULL, dia_semana INTEGER NOT NULL)');
  query.on('end', () => { client.end(); console.log("Tabela horarios_aula criada com sucesso\n");});
};

createTableEmentas();
createTableAtividades();
createTableHorariosAula();
createTableCursos();
