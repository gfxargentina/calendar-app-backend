/* 
    Event routes
    /api/events
*/

const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//todas las peticiones tienen que pasar por la validacion del JWT
router.use( validarJWT );


//obtener eventos
router.get('/', getEventos );

//crear un nuevo evento
router.post('/', crearEvento );

//actualizar evento 
router.put('/:id', actualizarEvento );

//borrar evento 
router.delete('/:id', borrarEvento );


module.exports = router;