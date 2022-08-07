const productRouter = require('./products.router');
const userRouter = require('./users.router');
const categoryRouter = require('./categories.router');

function routerApi(app) {

    app.use('/products', productRouter);
    app.use('/users', userRouter);
    app.use('/categories', categoryRouter);
}

module.exports = routerApi;
