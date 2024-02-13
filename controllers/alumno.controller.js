const bcryptsjs = require('bcryptsjs');
const Alumno = require('../models/alumno');
const {response, request} = require('express');

const AlumnosPost = async (req, res) =>{
    const {nombre, correo, password, carne, cursos, role} = req.body;
    const alumno = new Alumno({nombre, correo, password, carne, cursos, role});

    const salt = bcryptsjs.genSaltSync();
    alumno.password = bcryptsjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        alumno
    });
}

module.exports = {
    AlumnosPost
    
}