const { response } = require('express');
const Usuario = require('../models/Usuario');


 const crearUsuario = async(req, res = response ) => {

   //const { name, email, password } = req.body;

   try {
       const usuario = new Usuario( req.body );

       await usuario.save();
        
        res.status(201).json({ 
            ok: true,
            msg: 'Nuevo Registro'
    })
   } catch (error) {
       console.log(error)
       res.status(500).json({
           ok: false,
           msg: 'Hubo un Error'
       })
       
   }
    
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body;

    res.status(200).json({
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