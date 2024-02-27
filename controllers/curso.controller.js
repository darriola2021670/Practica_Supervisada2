const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');
const { response } = require('express');

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const putCursos = async (req, res = response) => {
    const {id}  = req.params;
    const {_id, nombre, descripcion, ...resto} = req.body;
    
    const curso = await Curso.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'curso Actualizado Exitosamente!!!!',
        curso
    });

}

const cursoPost = async (req, res) => {
    const {nombre, descripcion} = req.body;
    const curso = new Curso({nombre, descripcion});

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursoPost,
    putCursos,
    getCursoById
};
