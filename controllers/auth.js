const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


 const crearUsuario = async(req, res = response ) => {

   const { email, password } = req.body;

     try {
          let usuario = await Usuario.findOne({email})  ;
          //si el usuario existe en la db
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

         //generar JMW
         const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({ 
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
    })
   } catch (error) {
       console.log(error)
       res.status(500).json({
           ok: false,
           msg: 'Hubo un Error'
       })
       
   }
    
}

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});
        //si el usuario no existe en la db
          if ( !usuario ) {
              return res.status(400).json({
                  ok:false,
                  msg: 'El usuario no existe con ese email'
              })
          }
          //confirmar los passwords
          const validPassword = bcrypt.compareSync( password, usuario.password );
          //si el password no es igual
          if ( !validPassword ) {
              return res.status(400).json({
                  ok:false,
                  msg: 'Password incorrecto'
              })
          }

          //generar JWT
          const token = await generarJWT( usuario.id, usuario.name );

          res.json({
              ok: true,
              uid: usuario.id,
              name: usuario.name,
              token
          })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un Error, hable con el administrador'
        })
    }

    
}

const revalidarToken = async( req, res = response ) => {

    const { uid, name } = req;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        uid,
        name,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}