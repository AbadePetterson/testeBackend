const bcrypt = require('bcrypt');
const Usuario = require('../../model/accounts');


const login = (req, res) => {
  const { username, password } = req.body;
  const message = 'No active account found with the given credentials';

  Usuario.findOne({
    where: { nomeUsuario: username },
  }).then((instance) => {
    if (instance) {
      bcrypt.compare(password, instance.dataValues.senhaUsuario, (err, isMatch) => {
        if (err) {
          console.error('[-] login -> Could not compare passwords:', err);
          throw err;
        }

        if (isMatch) {
          req.session.username = username;
          res.statusCode = 200;
          res.json({ 'detail': 'Logged in' });
        }
        else {
          res.statusCode = 401;
          res.json({ 'detail': message });
        }
      });
    }
    else {
      res.statusCode = 401;
      res.json({ 'detail': message });
    }

  }).catch((err) => {
    if (err) {
      console.error('[-] login -> Could not find user:', err);
      throw err;
    }
  });
}


module.exports = login;
