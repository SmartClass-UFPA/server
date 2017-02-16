const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const cursosController = require('../controllers/cursosController');
const horarios = require('../controllers/horariosAulaController')

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: 'mysecretpassword', //env var: PGPASSWORD
  host: '172.17.0.2', // Server hosting the postgres database
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
/*
Ementas:
	/ementa/$n_curso/  localhost:3000/ementa/123
		Get - Todas as matérias do curso
		Delete - Deleta  ementa do curso
		Post - Adiciona uma nova matéria a ementa

	/ementa/$n_curso/$semestre/
		Get - Todas as matérias do semestre

	/ementa/$n_curso/$cod_materia
		Get - Informações da matéria
		Delete - Deleta a matéria
		Update - Atualiza informações da matéria

*/
//router.post('/ementas/:todo_id', cursosController.addEmenta);

module.exports = router;
