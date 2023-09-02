const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

//Controlador para opteners todos los usuarios
const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, "nombre email role google");

    res.json({
        ok: true,
        usuarios,
    });
};

//Controlador para Crear usuario.
const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado",
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar el usuario.
        await usuario.save();

        //Generar el TOKEN - JS
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }
};

//Controlador para actualizar un usuario.
const actualizarUsuario = async (req = request, res = response) => {

    //TODO: Validar Toke y comprobar si es el usuario correcto.

    const uid = req.params.id;
    const { } = req.body;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }

        //Optenemos los datos del usuario de la peticion.
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email: email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email",
                });
            }
        }

        campos.email = email;

        // Actualizaciones
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...",
        })
    }

};

const borrarUsuario = async (req = request, res = response) => {
    const { id } = req.params

    try {

        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario por ese id",
            });
        }

        await Usuario.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...",
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
