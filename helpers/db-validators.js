const Role = require('../models/role');
const Alumno = require('../models/alumnos');
const Profesor = require('../models/profesor');

const esRoleValido = async (role = '') =>{
    const existeRol = await Role.findOne({});
    if(!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existenteEmail = async(correo = '') =>{
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail) {
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existenteId = async(id = '') =>{
    const existenteId = await Alumno.findOne({id});
    if(existenteId){
        throw new Error(`El id ${ id } no se encuentra registrado en la base de datos`);
    }
}

module.exports = {
    existenteId,
    esRoleValido,
    existenteEmail
}