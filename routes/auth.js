/*
    Ruta: /api/login
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

router.post('/',
    [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login,
)

router.post('/google',
    [
        body('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get('/renew',
    validarJWT,
    renewToken
)


module.exports = router;