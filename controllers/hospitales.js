const { request, response } = require("express");

const Hospital = require("../models/hospital");


const getHospitales = async(req = request, res = response) => {
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img')


    res.json({
        ok: true,
        hospitales,
    });
};

const creartHospital = async (req = request, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

       const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }



};

const actualizarHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "Put Hospitales",
    });
};

const borrarHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "Delete Hospitales",
    });
};

module.exports = {
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
};
