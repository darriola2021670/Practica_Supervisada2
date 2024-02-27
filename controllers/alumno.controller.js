const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const {response, request} = require('express');

const alumnosGet = async(req, res = response) =>{
    const{limite, desde} = req.query;
    const query = {estado: true};

    const[total, alumnos] = await Promise.all([
        Alumno.countDocuments(query), 
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnoBYId = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        alumno
    });
}

const putAlumnos = async (req, res = response) =>{
    const {id}  = req.params;
    const {_id, password, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Alumno Actualizado Exitosamente!!!!',
        alumno
    });

}

const alumnosDelete = async(req, res) =>{
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Alumno eliminado',
        alumno
    })
}

const alumnosPost = async (req, res) =>{
    const {nombre, correo, password, carne, role} = req.body;
    const alumno = new Alumno({nombre, correo, password, carne, role});

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(202).json({
        alumno
    });
}

const asignarCurso = async (req, res = response) => {
    const { idAlumno, idCurso } = req.body;

    try {
        const alumno = await Alumno.findById(idAlumno);
        if (!alumno) {
            return res.status(404).json({
                msg: 'Alumno no encontrado',
            });
        }

        const curso = await Curso.findById(idCurso);
        if (!curso) {
            return res.status(404).json({
                msg: 'Curso no encontrado',
            });
        }

        if (alumno.cursos.includes(idCurso)) {
            return res.status(400).json({
                msg: 'El alumno ya está inscrito en este curso',
            });
        }

        alumno.cursos.push(idCurso);
        await alumno.save();

        res.status(200).json({
            msg: 'Curso asignado al alumno exitosamente',
            alumno,
            curso,
        });
    } catch (error) {
        console.error('Error al asignar curso al alumno:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};

module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnoBYId,
    putAlumnos,
    alumnosDelete,
    asignarCurso
}