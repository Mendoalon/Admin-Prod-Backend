/*
    Ruta: /api/login
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

router.post('/', 
    [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login,
)

router.post( '/google',
    [
        body('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)


module.exports = router;