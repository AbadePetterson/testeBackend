const { Produtor } = require('../../model/business');


const listProdutores = (req, res) => {
  console.info('GET /business/produtores');

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  Produtor.findAll()
  .then((produtores) => {
    res.statusCode = 200;
    res.json(produtores.filter(produtor => produtor.dataValues));
  })
  .catch((error) => {
    res.statusCode = 500;
    res.json({ 'detail': error.message });
  });
}


const createProdutor = (req, res) => {
  console.info('POST /business/produtores');

  //------------------------------------------
  // Validations
  //------------------------------------------
  const errors = [];

  if (!req.body.hasOwnProperty('nomeProdutor')) {
    errors.push('Parameter `nomeProdutor` is required');
  }
  else if (typeof(req.body.nomeProdutor) !== 'string') {
    errors.push('Parameter `nomeProdutor` must be a string type');
  }
  else if (req.body.nomeProdutor === '') {
    errors.push("Parameter `nomeProdutor` can't be empty");
  }

  if (!req.body.hasOwnProperty('cpfProdutor')) {
    errors.push('Parameter `cpfProdutor` is required');
  }
  else if (typeof(req.body.cpfProdutor) !== 'string') {
    errors.push("Parameter `cpfProdutor` must be a string type");
  }
  else if (req.body.cpfProdutor === '') {
    errors.push("Parameter `cpfProdutor` can't be empty");
  }

  if (errors.length) {
    res.statusCode = 400;
    res.json({ errors });
    return;
  }

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  Produtor.create({
    nomeProdutor: req.body.nomeProdutor,
    cpfProdutor: req.body.cpfProdutor,
  })
  .then((produtor) => {
    res.statusCode = 201;
    res.json(produtor.dataValues);
  })
  .catch((error) => {
    res.statusCode = 500;
    res.json({ 'detail': error.message });
  });
}


module.exports = { listProdutores, createProdutor };
