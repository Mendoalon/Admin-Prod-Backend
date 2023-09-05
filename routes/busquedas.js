/*
    Ruta: /api/todo/:busquedas
*/

const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middleware/validar-jwt');

const {
    getTodos, getDocumentosColleccion
} = require('../controllers/busquedas');

//Ruta Para buscar un medico, hospital o usuario.
router.get('/:busqueda', validarJWT, getTodos);

//Ruta Para buscar un medico, hospital o usuario.
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColleccion);


module.exports = router;