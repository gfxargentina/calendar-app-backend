const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


 const crearUsuario = async(req, res = response ) => {

   const { email, password } = req.body;

   try {
          let usuario = await Usuario.findOne({email})  ;
          if ( usuario ) {
              return res.status(400).json({
                  ok:false,
                  msg: 'Un usuario ya existe con ese correo'
              })
          }
         
         usuario = new Usuario( req.body );

         //Encriptar Contraseña
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync( password, salt );

         await usuario.save();
        
        res.status(201).json({ 
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email
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