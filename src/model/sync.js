const sequelize = require('./config');
require('./accounts');
require('./business');
const Usuario = require('./accounts');
const bcrypt = require('bcrypt');


// Creates the table if it doesn't exist (and does nothing if it
// already exists)
console.info('[*] Creating missing tables...');
sequelize.sync()
.then(() => {})
.catch((err) => {
  console.error('[-] Error creating tables:', err);
});

// This checks what is the current state of the table in the database
// (which columns it has, what are their data types, etc), and then
// performs the necessary changes in the table to make it match the
// model.
console.info('[*] Checking for changes in the models...');
sequelize.sync({ alter: true })
.then(() => {
  username = 'admin';
  password = '123456';

  Usuario.findOne({
    where: { nomeUsuario: username },
  }).then((instance) => {
    if (!instance) {
      console.info('[*] Creating initial user...');
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error('[-] sync -> Could not generate password hash for initial user:', err);
            throw err;
          }

          Usuario.create({
            nomeUsuario: username,
            senhaUsuario: hash,
          })
          .then((usuario) => {
            console.info(`\n[*] Initial user created successfully:\n\tUsername: ${username}\n\tPassword: ${password}\n`);
          })
          .catch((err) => {
            if (err) {
              console.error('[-] sync -> Could not create initial user:', err);
              throw err;
            }
          });
        });
      });
    }
  }).catch((err) => {
    if (err) {
      console.error('[-] sync -> Could not find initial user:', err);
      throw err;
    }
  });
})
.catch((err) => {
  console.error('[-] Error while checking for changes:', err);
  throw err;
});

