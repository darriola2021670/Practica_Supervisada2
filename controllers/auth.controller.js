const { request, response } = require("express");
const Alumno = require("../models/alumno");
const Profesor = require("../models/profesor");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const { correo, password, rol } = req.body;

    try {
        let usuario;
        if (rol === 'alumno') {
            usuario = await Alumno.findOne({ correo });
        } else if (rol === 'profesor') {
            usuario = await Profesor.findOne({ correo });
        } else {
            return res.status(400).json({
                msg: "Rol no válido. Debe especificar 'alumno' o 'profesor'."
            });
        }

        if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: `El ${rol} no existe en la base de datos.`
            });
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Bienvenido",
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    }
};

module.exports = {
    login
};
