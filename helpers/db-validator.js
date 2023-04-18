const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({
    rol
  });
  if (!existeRol) {
    throw new Error(`El rol: ${rol} no esta registrado en la base de datos`);
  }
}

const emailValido = async (correo = '') => {
  const existeEmail = await Usuario.findOne({
    correo
  });
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo: ${correo} ya esta registrado en la base de datos`
    });
  }
}

const usuarioValido = async (id) => {
  const existeUsuario = await Usuario.findById({
    id
  });
  if (!existeUsuario) {
    return res.status(400).json({
      msg: `El ID: ${id} no existe en la base de datos`
    });
  }
}

module.exports = {
  esRoleValido,
  emailValido,
  usuarioValido
}