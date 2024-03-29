const { request, response } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req = request, res = response) => {
    const medicos = await Medico.find()
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");

    res.json({
        ok: true,
        medicos,
    });
};

const creartMedico = async (req = request, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body,
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }
};

const actualizarMedico = async (req = request, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado por id",
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,
            cambiosMedico,
            {
                new: true,
            }
        );

        res.json({
            ok: true,
            medico: medicoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }
};

const borrarMedico = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado por id",
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico Eliminado",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }
};

const getMedicoById = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id)
                                     .populate('usuario', 'nombre img')
                                     .populate('hospital', 'nombre img');

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado por id",
            });
        }


        res.json({
            ok: true,
            medico: medicoDB,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... Revisar logs",
        });
    }
};

module.exports = {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};
