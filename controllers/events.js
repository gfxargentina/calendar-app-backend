const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos= ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento= async( req, res = response ) => {

    //verificar que el evento llega
    //console.log( req.body)

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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