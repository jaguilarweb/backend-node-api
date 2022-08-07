const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

// Middleware nativo de express para recibir los datos en formato json.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World Express!');
});

app.get('/ruta', (req, res) => {
  res.send('Cambiando ruta!');
});

//Routes
routerApi(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
