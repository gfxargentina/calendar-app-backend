/*
    Rutas de usuarios / Auth
    host + /api/auth

*/

// const express = require('express');
// const router = express.Router

//desesestructuramos para hacer lo mismo que arriba que es lo mismo
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();


const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');



router.post('/new', 
            [//middlewares
               check('name', 'el nombre es obligatorio').not().isEmpty(),
               check('email', 'El email es obligatorio').isEmail(),
               check('password', 'El password debe ser de mas de 5 caracteres').isLength({ min: 5 }) 
            ], 
            crearUsuario );
router.post('/',
            [
                check('email', 'el email es obligatorio').isEmail(),
                check('password', 'El password debe ser de mas de 5 caracteres').isLength({ min:5 })
            ], 
            loginUsuario );
router.get('/renew', revalidarToken );

module.exports = router;