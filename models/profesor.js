const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El  nombre es requerido']
    },
    correo:{
        type: String,
        required: [true,'El Correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE","TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Profesor', ProfesorSchema);