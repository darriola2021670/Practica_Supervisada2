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
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);