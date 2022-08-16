const express = require('express');
//const faker = require('faker');

const ProductService = require('./../services/product.service');

//Antes del uso de router.
/* const app = express();
app.get('/', (req, res) => {}) */

//Usando router.
//Está resolviendo la ruta '/products'.
const router = express.Router();
const service = new ProductService();


router.get('/', async (_req, res) => {
/*   const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });
  } */
  const products = await service.findAllProducts();
 //const products = await service.find();
  res.json(products);
});

//Los endpoint de forma especifica deben de ir antes de los dinámicos.
// Filter, Endpoint específico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Endpoint dinámicos
router.get('/:id', async (req, res, next) => {
try {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json(product);
} catch (error) {
  next(error);
}
/*   if (id === '999') {
    res.status(404).json({
      error: 'El id no puede ser 999'
    });
  }else{
    res.status(200).json({
      id,
      name: "Producto",
      price: 300
    });
  } */

})

router.post('/', async (req, res) => {
  //Los datos que se reciben en el body de una petición POST.
  //En este caso se requiere un middleware nativo de express para recibir los datos en formato json.
  const body = req.body;
  const newProduct = await service.createProduct(body);
  res.status(201).json({newProduct});
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.updateProduct(id, body);
    res.json({product});
  } catch (error) {
    next(error);
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.deleteProduct(id);
  res.json(rta);
});

module.exports = router;
