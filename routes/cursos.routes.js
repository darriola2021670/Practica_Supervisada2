const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { cursoPost, putCursos, getCursoById } = require('../controllers/curso.controller');

const router = Router();

router.get('/:id', getCursoById);

router.put(
    '/:id',
    [
        check('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
        check('descripcion', 'La descripción no puede estar vacía').not().isEmpty(),
        check('profesorId', 'ID del profesor no válido').isMongoId(),
        check('alumnosIds.*', 'ID de alumno no válido').isMongoId(),
        validarCampos,
    ],
    putCursos
);

router.post(
    '/',
    [
        check('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
        check('descripcion', 'La descripción no puede estar vacía').not().isEmpty(),
        validarCampos,
    ],
    cursoPost
);

module.exports = router;
