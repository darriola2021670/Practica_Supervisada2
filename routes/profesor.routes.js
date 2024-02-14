const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRolAutorizado } = require('../middlewares');

const {
    profesoresGet, 
    getProfesorBYId, 
    putProfesores, 
    profesorPost, 
    profesoresDelete,} = require('../controllers/profesor.controller');

const { existenteId, esRoleValido, existenteEmail } = require('../helpers/db-validators');


const router = Router();

router.get("/", profesoresGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getProfesorBYId);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        check("role").custom(esRoleValido),
        validarCampos
    ], putProfesores);

router.post(
    "/",
    [
       check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
       check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
       check("correo", "Este no es un correo valido").isEmail(),
       check("correo").custom(existenteEmail),
       check("role").custom(esRoleValido),
       validarCampos, 
    ],profesorPost);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], profesoresDelete);

    module.exports = router;