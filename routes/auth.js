/*
    Rutas de usuarios / Auth
    host + /api/auth

*/

// const express = require('express');
// const router = express.Router

//desesestructuramos para hacer lo mismo que arriba que es lo mismo
const { Router } = require('express');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');



router.post('/new', crearUsuario );
router.post('/', loginUsuario );
router.get('/renew', revalidarToken );

module.exports = router;