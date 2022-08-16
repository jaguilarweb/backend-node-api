const express = require('express');
const routerApi = require('./routes');

//libreria para pasar errores asincronos.
require("express-async-errors");


const {logErrors, errorHandler } = require('./middlewares/error.handler');

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

// Los middleware de error deben ir al final de la configuración de rutas.
//Después de la definición de los routing.
//Esto es importante porque si no, los errores no se manejan correctamente.
//Otra cosa importante es el orden de los middlewares.
app.use(logErrors);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
