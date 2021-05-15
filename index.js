const express = require('express');

// variables de entorno
require('dotenv').config();


//para ver todos los procesos que estan corriendo
//console.log( process.env ) ;


//Crear el servidor de express
const app = express();


//Directorio publico
app.use( express.static('public') );


//Rutas
// app.get('/', (req, res) => {
//     //console.log('Se requiere la ruta /');
//     res.json({
//         ok: true
//     })
// })





//Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})