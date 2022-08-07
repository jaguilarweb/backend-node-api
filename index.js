const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World Express!');
});

app.get('/ruta', (req, res) => {
  res.send('Cambiando ruta!');
});

app.get('/productos', (req, res) => {
  res.json({
    name: "Producto 1",
    price: 100
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
