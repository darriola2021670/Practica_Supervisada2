const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'Se necesita una descripción'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    profesor: {
        type: String,
        ref: 'Profesor', 
    },
    alumnos: [{
        type: String,
        ref: 'Alumno', 
    }],
});

module.exports = model('Curso', CursoSchema);
