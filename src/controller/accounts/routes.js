const { express, loginRequired } = require('../config');
const login = require('./login');
const logout = require('./logout');
const { listUsuarios, createUsuario } = require('./user');


const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/usuarios', loginRequired, listUsuarios);
router.post('/usuarios', loginRequired, createUsuario);

module.exports = {
  accounts: router,
  listUsuarios,
  createUsuario,
};
