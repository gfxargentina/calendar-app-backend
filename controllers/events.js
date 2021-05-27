const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos= async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
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

const actualizarEvento= async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //busca el evento por id 
        const evento = await Evento.findById( eventoId );

        //verifica si el evento existe, si no existe tira un error
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            })
        }

        //verificar si el usuario es el mismo que lo quiere modificar, si es asi lo graba en la db, si no es
        //el mismo usuario tira un error y no lo graba en la db
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg:'No esta autorizado a modificar este evento'
            });
        }

        //nueva data modificada
        const nuevoEvento = { 
            ...req.body,
            user: uid
        }

        //actualizar evento , new: true - devuelve los datos actualizados
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        res.json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   }

const borrarEvento= async( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //busca el evento por id 
        const evento = await Evento.findById( eventoId );

        //verifica si el evento existe, si no existe tira un error
        if ( !evento ) {
           return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            })
        }

        //verificar si el usuario es el mismo que lo quiere modificar, si es asi lo graba en la db, si no es
        //el mismo usuario tira un error y no lo graba en la db
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg:'No esta autorizado a eliminar este evento'
            });
        }

        //borrar evento 
        await Evento.findByIdAndDelete( eventoId );
        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   }


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}