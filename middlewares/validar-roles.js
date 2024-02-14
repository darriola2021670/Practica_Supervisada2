const { response } = require("express");

const esRol = (rolValido) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        const { role, nombre } = req.usuario;

        if (role !== rolValido) {
            return res.status(401).json({
                msg: `${nombre} no tiene el rol ${rolValido}, no puede usar este endpoint`
            });
        }
        next();
    };
};

const tieneRolAutorizado = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        }
        next();
    };
};

module.exports = {
    esRol,
    tieneRolAutorizado
};
