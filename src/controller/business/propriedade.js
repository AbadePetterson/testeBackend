const { Propriedade } = require('../../model/business');


const listPropriedades = (req, res) => {
  console.info('GET /business/propriedades');

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  Propriedade.findAll()
    .then((propriedades) => {
      res.statusCode = 200;
      res.json(propriedades.filter(propriedade => propriedade.dataValues));
    })
    .catch((error) => {
      res.statusCode = 500;
      res.json({ 'detail': error.message });
    });
}


const createPropriedade = (req, res) => {
  console.info('POST /business/propriedades');

  //------------------------------------------
  // Validations
  //------------------------------------------
  const errors = [];

  if (!req.body.hasOwnProperty('nomePropriedade')) {
    errors.push('Parameter `nomePropriedade` is required');
  }
  else if (typeof (req.body.nomePropriedade) !== 'string') {
    errors.push('Parameter `nomePropriedade` must be a string type');
  }
  else if (req.body.nomePropriedade === '') {
    errors.push("Parameter `nomePropriedade` can't be empty");
  }

  if (!req.body.hasOwnProperty('cadastroRural')) {
    errors.push('Parameter `cadastroRural` is required');
  }
  else if (typeof (req.body.cadastroRural) !== 'string') {
    errors.push("Parameter `cadastroRural` must be a string type");
  }
  else if (req.body.cadastroRural === '') {
    errors.push("Parameter `cadastroRural` can't be empty");
  }

  if (errors.length) {
    res.statusCode = 400;
    res.json({ errors });
    return;
  }

  //------------------------------------------
  // ORM operations & Business logic
  //------------------------------------------
  Propriedade.create({
    nomePropriedade: req.body.nomePropriedade,
    cadastroRural: req.body.cadastroRural,
  })
    .then((propriedade) => {
      res.statusCode = 201;
      res.json(propriedade.dataValues);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.json({ 'detail': error.message });
    });
}


module.exports = { listPropriedades, createPropriedade };
