var express = require('express');
var router = express.Router();

// Cargamos el modulo de express validator: object destructuring, solo usaremos esos dos:
// query -> es un middeware, lo cargamos en donde tengamos peticiones query:
const { query, validationResult, body, param } = require('express-validator');
const Agente = require('../models/Agente');

/*
GET home page.
Middeware de las vistas:
Esto tambien es un Middeware.
('/') -> esto es un filtro para express.
GET tipo de peticion.
Renderizamos las vistas usando ejs, le pasamos al metodo el archivo que se a renderizar y un objeto con lo valores que luego vemos en la vista index.js
*/
router.get('/', function (req, res, next) {
  // Aqui vemos como poner una variable global pero dentro del middeware que usara la vista:
  res.locals.valor = '<script>alert("inyeccion de codigo")</script>';
  // Tambien podemos ver condicionales para mostrar en las vistas ejs:
  const segundo = (new Date()).getSeconds();
  res.locals.condicion = {
    segundo: segundo,
    estado: segundo % 2 === 0 // es par
  }

  // Vamos a ver como hacer tambien iteraciones: Creamos un objeto:
  res.locals.users = [
    { name: 'smith', age: 23 },
    { name: 'Jones', age: 35 },
    { name: 'Thomas', age: 21 }
  ]

  // Metodo que recibe la vista y un objeto de variables:
  // quitamos el titulo para usar variable global:
  // res.render('index', { titulo: 'Express', profesion: 'Ingeniero' });
  res.render('index', { profesion: 'Ingeniero' });
});

// Creamos nuestro Middeware, una ruta nueva:
// http://localhost:3000/paramenruta/33
router.get('/paramenruta/:id', (req, res, next) => {
  // Vemos por el log:
  console.log('req.params', req.params);
  res.send('Resp OK solo id');
})

// http://localhost:3000/params/23/piso/2/puerta/C
router.get('/params/:id/piso/:piso/puerta/:puerta', (req, res, next) => {
  // Vemos por el log:
  console.log('req.params', req.params);
  res.send('OK-YEAH-toda la ruta');
})

// http://localhost:3000/params/piso/2/puerta/C Un parametro opcional: ?
router.get('/params/:id?/piso/:piso/puerta/:puerta', (req, res, next) => {
  // Vemos por el log:
  console.log('req.params', req.params);
  // Los parametros son string, lo vemos en el log:
  res.send('OK-YEAH-opcional');
})

// http://localhost:3000/params/23/piso/2/puerta/C Ponemos un filtro por expresion regular id() OJO para ver que este funciona comenta los anteriores.
// Para expresiones regulares: Ver -> regexr.com
router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  // Vemos por el log:
  console.log('req.params', req.params);
  res.send('OK - expresion- regular');
})

/**
  Ahora aqui vemos las peticiones con query strings:
  http://localhost:3000/enquerystring?color=rojo&talla=2&lang=it
  Probamos url mal y vemos la validacion:
  http://localhost:3000/enquerystring?color=Rojo&talla=l&lang=it
 */
// Tambien cargamos middeware query:
router.get('/enquerystring',
  // Vemos la validacion con middeware query:
  query('color').isLowercase().withMessage('must be lower case'),
  query('talla').isNumeric().withMessage('must be numeric'),
  (req, res, next) => {
    // Aqui usamos el otro middeware validationResult:
    validationResult(req).throw(); // Lanza excepcion si no valida lo de query().
    // Vemos por el log:
    console.log('req.query', req.query);
    res.send('OK - query string');
  })

/*
Peticiones de tipo POST:
Para probarlo debemos hacerlo con postman: Es un entorno para el desarrollo de apis.
http://localhost:3000/rutapost
Pasamos por el body:
Y los parametros
key:
value:
Y vemos como lo recibimos en el log: con el objeto req.body:
*/
router.post('/rutapost', (req, res, next) => {
  // Vemos por el log:
  // Recuerda en postman hacer peticion de tipo urlencoded y en el body meter los datos para ver salida en el log:
  // ver imagen anexa post-1 en practica/img
  console.log('req.body', req.body);
  res.send('OK - petición de tipo POST');
})

module.exports = router;
