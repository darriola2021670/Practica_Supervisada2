const { Router } = require('express');
const { check } = require('express-validator');

const { loginProf } = require('../controllers/authProfe.profesor');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginProf',
    [
        check('correo', "Este no es un correo valido").isEmail(),
        check('password', "El password es obligatorio").not().isEmpty(),
        validarCampos
    ], loginProf);

    module.exports = router;