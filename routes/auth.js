/*
    Rutas de usuarios / Auth
    host + /api/auth

*/

// const express = require('express');
// const router = express.Router

//desesestructuramos para hacer lo mismo que arriba que es lo mismo
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({ 
        ok: true
    })
})

module.exports = router;