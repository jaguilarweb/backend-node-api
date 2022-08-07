const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World Express!');
});

app.get('/ruta', (req, res) => {
  res.send('Cambiando ruta!');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: "Producto 1",
      price: 100
    },
    {
      name: "Producto 2",
      price: 200
    }]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Producto",
    price: 300
  });
})

//Endpoint con 2 parametros dinamicos en la url

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  });
})

// Parámetros query para hacer filtros

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros')
  }

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
