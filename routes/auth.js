/*
    Ruta: /api/login
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

router.post('/', 
    [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login,
)


module.exports = router;