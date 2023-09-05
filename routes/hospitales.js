/*
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const {
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales')

//Ruta Optener todos los hospitales.
router.get('/', validarJWT, getHospitales);

//Ruta crear un hospital.
router.post('/',
    [
        validarJWT,
        body('nombre', 'El nombre del hospital obligatorio').not().isEmpty(),
        validarCampos
    ],
    creartHospital);

//Ruta Actualizar un hospital.
router.put('/:id',
    [
    ],
    actualizarHospital);

//Ruta eliminar un hospital.
router.delete('/:id', borrarHospital);




module.exports = router;