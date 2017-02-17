const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const cursosController = require('../controllers/cursosController');
const horarios = require('../controllers/horariosAulaController');
const ementas = require('../controllers/ementasController');
const salas = require('../controllers/salasController');
const atividades = require('../controllers/atividadesController');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.3', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Cursos
router.post('/cursos/', cursosController.addCurso); //Adicionar Curso
router.get('/cursos/', cursosController.listarCursos); //Ler todos os cursos
router.get('/cursos/:todo_id', cursosController.listarCurso); //Ler informações de um curso
router.delete('/cursos/:todo_id', cursosController.delCurso); //Deletar um curso
router.put('/cursos/:todo_id', cursosController.atualizarCurso); //Atualizar Curso

//Horarios
router.post('/horarios/', horarios.addHorario);
router.get('/horarios/', horarios.listarHorarios);
router.get('/horarios/:todo_id/:semestre/:turno', horarios.exibeHorario);
router.delete('/horarios/:todo_id/:semestre/:turno', horarios.delHorario);
router.put('/horarios/:todo_id/:semestre/:turno', horarios.atualizarHorario);

//Ementas
router.post('/ementas/', ementas.addEmenta);
router.put('/ementas/', ementas.updateEmenta);
router.get('/ementas/:n_curso', ementas.listarEmenta);
router.delete('/ementas/:n_curso', ementas.delEmenta);
router.get('/ementas/:n_curso/:semestre', ementas.listarEmentas);
router.get('/ementas/:n_curso/materia/:materia', ementas.listarEmentaMateria);
router.delete('/ementas/:n_curso/materia/:materia', ementas.delEmentaMateria);

//Salas
router.post('/salas/', salas.addSala);
router.get('/salas/:local/:sala', salas.readSala);
router.delete('/salas/:local/:sala', salas.delSala);
router.post('/salas/:local/:sala/:status', salas.updateStatus);

//atividades
router.post('/atividades/', atividades.addAtividade);
router.put('/atividades/', atividades.updateAtividades);
router.get('/atividades/:n_curso/:semestre/:materia', atividades.listarAtividades);
router.delete('/atividades/:n_curso/:semestre/:materia', atividades.delAtividadeTurno);
router.get('/atividades/:n_curso/:semestre/:turno/:materia', atividades.listarAtividadesMateria);
router.delete('/atividades/:n_curso/:semestre/:turno/:materia', atividades.delAtividadeMateria);


module.exports = router;
