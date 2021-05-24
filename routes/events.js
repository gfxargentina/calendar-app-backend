/* 
    Event routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//todas las peticiones tienen que pasar por la validacion del JWT
router.use( validarJWT );


//obtener eventos
router.get('/', getEventos );

//crear un nuevo evento
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate),
    validarCampos
], crearEvento );

//actualizar evento 
router.put('/:id', actualizarEvento );

//borrar evento 
router.delete('/:id', borrarEvento );


module.exports = router;