const express = require('express');
const faker = require('faker');

//Antes del uso de router.
/* const app = express();
app.get('/', (req, res) => {}) */

//Usando router.
//Está resolviendo la ruta '/products'.
const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
});

//Los endpoint de forma especifica deben de ir antes de los dinámicos.
// Filter, Endpoint específico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Endpoint dinámicos
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Producto",
    price: 300
  });
})

module.exports = router;
