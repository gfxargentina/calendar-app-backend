const { response } = require('express');

const getEventos= ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento= ( req, res = response ) => {

    //verificar que el evento llega
    //console.log( req.body)

    res.json({
        ok: true,
        msg: 'crearEvento'
    })
}

const actualizarEvento= ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const borrarEvento= ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'borrarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}