const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const {
    putCursos,
    getCursoById,
    cursoPost
} = require('../controllers/curso.controller')
const { existenteId} = require('../helpers/db-validators');

const router = Router();

router.get('/:id', getCursoById);

router.put(
    '/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ],putCursos);

router.post(
    '/',
    [
        check('nombre', 'El nombre no puede estar vacío').not().isEmpty(),
        check('descripcion', 'La descripción no puede estar vacía').not().isEmpty(),
        validarCampos,
    ],cursoPost);

module.exports = router;
