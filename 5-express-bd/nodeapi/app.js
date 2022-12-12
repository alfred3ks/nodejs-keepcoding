var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Eliminamos estas variables que se usan una sola vez:
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// Se crea un objeto app con la libreria express():
// Vemos lo metodos:
var app = express();

// view engine setup: Establecemos las vistas de la aplicacion:
// __dirname -> la carpeta actual: Sobre todo para rutas dinamicas, rutas absolutas:
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
// Aqui tenemos el motor de vistas ejs original que instala:
// app.set('view engine', 'ejs');
// Ahora lo cambiamos a HTML: Lo hacemos nosotros: Luego cambiar vistas a .html
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Middlewares: Una app de express es una lista de Middlewares, cuando llegue una peticion usa estos Middlewares: Un Middleware es una funcion que recibe tres parametros:
app.use(logger('dev')); // Cargamos lo log de las peticiones, gracias a Morgan, lo vemos en la consola:, el 'dev' es el formato del log. Lo vemos en la documentacion de morgan.

// Estos los vemos mas adelante:
app.use(express.json());

//  este middeware da soporte para las peticiones de tipo post o put sean urlencoded, OJO POSTMAN body: parsea el body en este formato si quisieramos otro para parsear en formato form-data podemos usar una libreria llamada multer, tenemos que crera un nuevo middeware.
// https://www.npmjs.com/package/multer
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// sirve para servir ficheros estaticos:
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdf', express.static(path.join(__dirname, 'public/pdf')));

/*
* Cargamos aqui nuestra conexion a la BD con mongodb
*/
require('./lib/connectMongoose');
// Cargamos el modelo:
require('./models/Agentes');

// Creamos nuestros Middeware: Recibe 3 parametros, necesarios req,res,next
app.use((req, res, next) => {
  // Hace una de 2 cosas: Pero nunca tener ambas respuestas:
  // - responder
  // res.send('ok');
  // - o llamar a next
  // console.log('Peticion a ->', req.originalUrl); // Vemos salida por consola:
  // next(new Error('cosa mala')); // Vemos como es pasarle cosas a next().
  // Si nos da error por consola: Cannot set headers after they are sent to the client, es que hemos respondido dos veces y eso esta prohibido en el protocolo HTTP. Osea no podemos tener un sen() y luego el next() juntos. O dos Middeware que respondan cada uno una cosa.
  next();

  // Cuando ponemos next() sin pasarle nada pasa a evaluar el siguiente Middeware, pero si le pasamos un objeto se salta todos y pasa a evaluar el Middeware de errores y se evalua ahi.
});

// ----------------------------------------------------------------------------------
/**
 * Rutas de mi apiv1, routes/apiv1
 * Las que creo yo.
 */

// Vemos la peticion:
// http://localhost:3000/apiv1/agentes
app.use('/apiv1/agentes', require('./routes/apiv1/agentes'))


// -----------------------------------------------------------------------------------
// Asi vemos como declaramos variables globales para vistas:
app.locals.title = 'NodeAPI';
// AQUI YA NO METEMOS LAS VARIABLES SINO EL REQUIRE DIRECTO:
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
/**
 * Rutas de mi aplicacion web: ROUTES: Las vemos en la carpeta routes:
 * MODIFICADAS LA ORIGINA SON LAS RUTAS DE ARRIBA:
 * Cuando hacemos peticiones estas son las rutas que se muestran: Son Middeware: Son agrupaciones de Middeware
 */
app.use('/', require('./routes/index'));
// Lo comentamos porque no lo vamos a usar, este por lo menos.
// app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler. Middeware de errores:
app.use(function (req, res, next) {
  // Next llama a una funcion de error: Cargada de la libreria http-error
  next(createError(404));
});

/*
error handler.
Middeware de gestion de errores, tiene 4 parametros: Este se lanza cuando next llama a un error:
*/
app.use(function (err, req, res, next) {
  // Chequeamos error de validacion: Codigo nuestro:
  if (err.array) { // Comprobamos si el error tiene un array si lo tiene hay un error
    // Le pasamos el error por codigo HTTP:
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0]; // Obtenemos el primer valor de ese array.
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // set locals, only providing error in development
  // res.local para pasar cosas a las vistas:
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // Renderizamos la vista de errores, con el metodo .render() de express.
  res.render('error');
});

module.exports = app;
