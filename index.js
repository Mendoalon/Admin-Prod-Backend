require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors')

//Crear el servidor de espress.
const app = express();

//Configuracion de CORS
app.use( cors() );

//Base de datos.
dbConnection();

//Rutas.
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        messa: 'Hola'
    })
});

app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo: ' + process.env.PORT);
})