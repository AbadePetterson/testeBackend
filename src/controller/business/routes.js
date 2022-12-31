const { express, loginRequired } = require('../config');
const { listProdutores, createProdutor } = require('./produtor');
const { listPropriedades, createPropriedade } = require('./propriedade');


const router = express.Router();

router.get('/produtores', loginRequired, listProdutores);
router.post('/produtores', loginRequired, createProdutor);
router.get('/propriedades', loginRequired, listPropriedades);
router.post('/propriedades', loginRequired, createPropriedade);


module.exports = { business: router };
