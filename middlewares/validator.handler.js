const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  //Construye middleware en forma dinámica.
  //Ocupando la propiedad de closure de js.
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
