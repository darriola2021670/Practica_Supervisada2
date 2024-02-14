const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    alumnosGet, 
    getAlumnoBYId, 
    putAlumnos, 
    alumnosPost, 
    alumnosDelete } = require('../controllers/alumno.controller');
const{existenteId, esRoleValido, existenteEmail} = require('../helpers/db-validators');

const router = Router();

router.get("/", alumnosGet)

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
    ], getAlumnoBYId);

    router.put(
        "/:id",
        [
            check('id', 'No es un id valido').isMongoId(),
            check('id').custom(existenteId),
            check("role").custom(esRoleValido),
            validarCampos
        ],putAlumnos);
    
    router.post(
        "/",
        [
            check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
            check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
            check("correo","Correo electronico invalido").isEmail(),
            check("correo").custom(existenteEmail),
            check("role").custom(esRoleValido),
            validarCampos
        ],alumnosPost);

    router.delete(
        "/:id",
        [
            validarJWT,
            check('id', 'No es un id valido').isMongoId(),
            check('id').custom(existenteId),
            validarCampos
        ], alumnosDelete);

        module.exports = router;

