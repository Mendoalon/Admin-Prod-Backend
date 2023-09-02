/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

//Ruta Optener todos los usuarios.
router.get('/', validarJWT, getUsuarios);

//Ruta crear un usuario.
router.post('/',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        validarCampos,

    ],
    crearUsuario);

//Ruta Actualizar un usuario.
router.put('/:id',
    [
        validarJWT,
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').isEmail(),
        body('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario);

//Ruta Actualizar un usuario.
router.delete('/:id', validarJWT, borrarUsuario);




module.exports = router;