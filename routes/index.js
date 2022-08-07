const express = require('express');
const productRouter = require('./products.router');
const userRouter = require('./users.router');
const categoryRouter = require('./categories.router');

function routerApi(app) {
  const router = express.Router();
  //Crea una ruta maestra o path global para todas las rutas que se creen
  app.use('/api/v1', router);
    router.use('/products', productRouter);
    router.use('/users', userRouter);
    router.use('/categories', categoryRouter);

  //app.use('/api/v2', router);
}

module.exports = routerApi;
