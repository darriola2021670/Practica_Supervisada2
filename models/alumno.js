const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es requerido']
    },
    correo:{
        type: String,
        required: [true,'El correo es requerido'],
        uniqued: true
    },
    carne:{
        type: String,
        required: [true, 'El carne es requerido'],
        uniqued: true
    },
    cursos:{
        type: String,
        required: [true, 'Los cursos son requeridos'],
    },
    
});

module.exports = model('Alumno', AlumnoSchema);