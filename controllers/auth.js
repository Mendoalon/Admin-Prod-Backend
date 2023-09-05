const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

//Controlador para realizar login.
const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificando email
        const usuarioBD = await Usuario.findOne({ email });

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: "Datos incorrectos",
            });
        }

        //Verificando contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Datos no validos",
            });
        }

        await Usuario.findOne({ email });

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: "Datos no validos",
            });
        }

        //Generar el TOKEN - JS
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }

};

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
};
