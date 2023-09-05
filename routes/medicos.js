/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

//Ruta Optener todos los medicos.
router.get('/', validarJWT, getMedicos);

//Ruta crear un medico.
router.post('/',
    [
        validarJWT,
        body('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
        body('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    creartMedico);

//Ruta Actualizar un medico.
router.put('/:id',
    [
    ],
    actualizarMedico);

//Ruta eliminar un medico.
router.delete('/:id', borrarMedico);




module.exports = router;