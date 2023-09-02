require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors')

//Crear el servidor de espress.
const app = express();

//Configuracion de CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos.
dbConnection();

//Rutas.
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo: ' + process.env.PORT);
})