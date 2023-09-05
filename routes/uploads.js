/*
    Ruta: /api/uploads
*/

const { Router } = require('express');
const router = Router();

const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middleware/validar-jwt');

router.use(expressFileUpload());

//Ruta Para gusdar la imagen de medico, hospital o usuario.
router.put('/:tipo/:id', validarJWT, fileUpload);

//Ruta Para ver la imagen de medico, hospital o usuario.
router.get('/:tipo/:foto', validarJWT, retornaImagen);




module.exports = router;