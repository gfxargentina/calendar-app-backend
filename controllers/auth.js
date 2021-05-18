const { response } = require('express');


 const crearUsuario = (req, res = response ) => {
    res.json({ 
        ok: true,
        msg: 'Nuevo Registro'
    })
}

const loginUsuario = ( req, res = response ) => {
    res.json({
        ok: true,
        msj: 'login'
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