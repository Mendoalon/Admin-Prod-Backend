const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

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
        const token = await generarJWT( usuarioBD.id);

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

module.exports = {
    login,
};
