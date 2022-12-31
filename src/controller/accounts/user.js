const Usuario = require('../../model/accounts');
const bcrypt = require('bcrypt');


const listUsuarios = (req, res) => {
  console.info('GET /accounts/usuarios');

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  Usuario.findAll()
  .then((usuarios) => {
    res.statusCode = 200;
    res.json(usuarios.filter(usuario => usuario.dataValues));
  })
  .catch((error) => {
    res.statusCode = 500;
    res.json({ 'detail': error.message });
  });
}


const createUsuario = (req, res) => {
  console.info('POST /accouts/usuarios');

  //------------------------------------------
  // Validations
  //------------------------------------------
  const errors = [];

  if (!req.body.hasOwnProperty('nomeUsuario')) {
    errors.push('Parameter `nomeUsuario` is required');
  }
  else if (typeof(req.body.nomeUsuario) !== 'string') {
    errors.push('Parameter `nomeUsuario` must be a string type');
  }
  else if (req.body.nomeUsuario === '') {
    errors.push("Parameter `nomeUsuario` can't be empty");
  }

  if (!req.body.hasOwnProperty('senhaUsuario')) {
    errors.push('Parameter `senhaUsuario` is required');
  }
  else if (typeof(req.body.senhaUsuario) !== 'string') {
    errors.push("Parameter `senhaUsuario` must be a string type");
  }
  else if (req.body.senhaUsuario === '') {
    errors.push("Parameter `senhaUsuario` can't be empty");
  }

  if (errors.length) {
    res.statusCode = 400;
    res.json({ errors });
    return;
  }

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.senhaUsuario, salt, (err, hash) => {
      if (err) {
        console.error('[-] createUsuario -> Could not generate password hash:', err);
        throw err;
      }

      Usuario.create({
        nomeUsuario: req.body.nomeUsuario,
        senhaUsuario: hash,
      })
      .then((usuario) => {
        res.statusCode = 201;
        usuario.dataValues.senhaUsuario = req.body.senhaUsuario;
        res.json(usuario.dataValues);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ 'detail': err.message });
        throw err
      });
    });
  });
}


module.exports = { listUsuarios, createUsuario };
