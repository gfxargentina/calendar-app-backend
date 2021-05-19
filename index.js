const express = require('express');

// variables de entorno
require('dotenv').config();


//para ver todos los procesos que estan corriendo
//console.log( process.env ) ;


//Crear el servidor de express
const app = express();


//Directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );


//Rutas (middlewares)
app.use('/api/auth', require('./routes/auth'));







//Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})