const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');
const { response } = require('express');

const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findOne({ _id: id });

        if (!curso) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        res.status(200).json({ curso });
    } catch (error) {
        console.error('Error al obtener curso por ID:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const putCursos = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, profesorId, alumnosIds } = req.body;

        const profesorExistente = true; 
        if (!profesorExistente) {
            return res.status(400).json({ msg: 'Profesor no encontrado o no tiene el rol adecuado' });
        }

        const alumnosExisten = true; 
        if (!alumnosExisten) {
            return res.status(400).json({ msg: 'Uno o más alumnos no encontrados o no tienen el rol adecuado' });
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, { nombre, descripcion, profesor: profesorId, alumnos: alumnosIds }, { new: true });

        if (!cursoActualizado) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        res.status(200).json({ msg: 'Curso actualizado exitosamente', curso: cursoActualizado });
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const cursoPost = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const curso = new Curso({ nombre, descripcion });

        const cursoGuardado = await curso.save();

        res.status(201).json({ msg: 'Curso creado exitosamente', curso: cursoGuardado });
    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

module.exports = {
    cursoPost,
    putCursos,
    getCursoById
};
