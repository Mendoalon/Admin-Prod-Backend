const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    // Leer el token 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            OK: false,
            msg: 'No hay token en la peticion',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            OK: false,
            msg: 'Token no valido',
        });
    }




}

const validarADMIN_ROLE = async (req, res, next) => {
    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid)

        if (!usuarioDB) {
            return res.status(401).json({
                OK: false,
                msg: 'Usuario no existe',
            });
        }


        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                OK: false,
                msg: 'No tiene privilegios',
            }); n
        }

        next();

    } catch (error) {
        return res.status(500).json({
            OK: false,
            msg: 'Hable con el administrator',
        });
    }

}

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid)

        if (!usuarioDB) {
            return res.status(401).json({
                OK: false,
                msg: 'Usuario no existe',
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                OK: false,
                msg: 'No tiene privilegios',
            });
        }

    } catch (error) {
        return res.status(500).json({
            OK: false,
            msg: 'Hable con el administrator',
        });
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}