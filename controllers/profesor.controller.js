const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const {response, request} = require('express');

const profesoresGet = async(req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const[total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesores
    });
}

const getProfesorBYId = async (req, res) =>{
    const {id} = req.params;
    const profesor = await Profesor.findOne({_id: id});

    res.status(200).json({
        profesor
    });
}

const putProfesores = async (req, res = response) =>{
    const {id} = req.params;
    const{_id, password, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const profesor = await Profesor.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Profesor Actualizado',
        profesor
    });
}

const profesoresDelete = async(req, res) =>{
    const {id} = req.params;
    const profesor = await Profesor.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg:'profesor eliminado',
        profesor
    });
}

const profesorPost = async (req, res) =>{
    const {nombre, correo, password, role} = req.body;
    const profesor = new Profesor({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(202).json({
        profesor
    });
}

module.exports = {
    profesorPost,
    profesoresGet,
    getProfesorBYId,
    putProfesores,
    profesoresDelete
}