// Aqui crearemos los middeware de rutas  para peticiones a la api:
'use strict';
// requerimos la libreria:
const express = require('express');
// Creamos un route:
const route = express.Router(); // patron que funciona con closures, no new.

// Cargamos nuestro modelo de los agentes: models
const Agente = require('../../models/Agentes');

// Creamos la respuesta para agentes a la BD:
// route.get('/', (req, res, next) => {
//   // Haremos que nos devuelva los valores de la bd: Vemos los metodos de busqueda de mongoose
//   // Lo Vemos de dos formas que se puede hacer con callback y con promesas:
//   // callback: OJO al metodo .exec().
//   Agente.find().exec((err, agentes) => {
//     if(err){
//       // Llamamos a next() pasandole el error para que muestre esa pagina de error:
//       // Se iria a app.js al middeware de errores: en app.js, ese se encarga, escalamos el error al gestor de errores:
//       next(err);
//       return;
//     }
//     // respondemos: Vemos por el navegador:
//     res.json({ success: true, agentes: agentes });
//   });
// })

// Version con async-await: Esta y la de arriba es lo mismo mejor esta:
route.get('/', async (req, res, next) => {
  // Version con promesas y async await:
  // Agente.find().then() // Aqui tenemos un objeto que simula una promesa un thenable.
  // Con el trycatch manejos el error y se lo mandamos al menejador de errores: Es lo mas recomendado:
  try {
    // NOTA: si le quitamos el .exce() tambien funciona porque lo que decimos arriba de thenable:
    const agentes = await Agente.find().exec();
    res.json({ success: true, agentes: agentes });
  } catch (error) {
    next(error);
    // return;
  }
});

// Exportamos el route para engancharlo en app.js
module.exports = route;
