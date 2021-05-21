const { response } = require('express');
const { validationResult } = require('express-validator');


 const crearUsuario = (req, res = response ) => {

   const { name, email, password } = req.body;

   //manejo de errores
   const errors = validationResult( req );
   //console.log(errors)
   if ( !errors.isEmpty() ) {
       return res.status(400).json({ 
           ok: false,
           errors: errors.mapped()
       });
   }
   

    res.status(201).json({ 
        ok: true,
        msg: 'Nuevo Registro',
        name,
        email,
        password
    })
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body;

     //manejo de errores
   const errors = validationResult( req );
   
   if ( !errors.isEmpty() ) {
       return res.status(400).json({ 
           ok: false,
           errors: errors.mapped()
       });
   }

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