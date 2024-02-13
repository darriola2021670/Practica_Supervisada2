const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { alumnosGet } = require('../controllers/alumno.controller');
const{existenteId} = require('../helpers/db-validators')

const router = Router();

router.get("/", alumnosGet)

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
    ]
)