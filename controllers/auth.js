const { response } = require('express');


 const crearUsuario = (req, res = response ) => {

   const { name, email, password } = req.body;

    res.json({ 
        ok: true,
        msg: 'Nuevo Registro',
        name,
        email,
        password
    })
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msj: 'login',
        email, 
        password
    })
}

const revalidarToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Token renew'
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}