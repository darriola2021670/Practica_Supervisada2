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
    password:{
        type: String,
        required: [true, 'La contrase;a es obligatoria']
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
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE","TEACHER_ROLE","CURSOS_ROLE"]
    },
    estado:{
        type: Boolean,
        default: false
    }
});

module.exports = model('Alumno', AlumnoSchema);