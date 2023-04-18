const {
  Router
} = require('express');
const {
  check
} = require('express-validator');

const {
  validarCampos
} = require('../middlewares/validar-campos');

const {
  esRoleValido,
  emailValido,
  usuarioValido
} = require('../helpers/db-validator');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(usuarioValido),
  check('rol').custom(esRoleValido),
  validarCampos
],
 usuariosPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailValido),
  check('password', 'El password debe de ser de mas de 6 letras').isLength({
    min: 6
  }),
  //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(usuarioValido)
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;