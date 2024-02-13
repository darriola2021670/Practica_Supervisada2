const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type:String,
        required: [true, 'Se necesita una descripcion']
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

module.exports = model('Curso', CursoSchema);