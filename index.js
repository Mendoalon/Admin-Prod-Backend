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
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));




app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo: ' + process.env.PORT);
})