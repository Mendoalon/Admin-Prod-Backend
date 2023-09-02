const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // Leer el token 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            OK: false,
            msg: 'No hay token en la peticion',
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        next();

    } catch (error) {
        return res.status(401).json({
            OK: false,
            msg: 'Token no valido',
        });
    }


    

}

module.exports = {
    validarJWT,
}