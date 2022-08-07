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
  if (id === '999') {
    res.status(404).json({
      error: 'El id no puede ser 999'
    });
  }else{
    res.status(200).json({
      id,
      name: "Producto",
      price: 300
    });
  }

})

router.post('/', (req, res) => {
  //Los datos que se reciben en el body de una petición POST.
  //En este caso se requiere un middleware nativo de express para recibir los datos en formato json.
  const body = req.body;
  res.status(201).json({
    message: "created",
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id
  });
});



module.exports = router;
