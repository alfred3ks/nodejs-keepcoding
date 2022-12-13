// Aqui crearemos los middeware de rutas  para peticiones a la api:
'use strict';
// requerimos la libreria:
const express = require('express');
// Creamos un route:
const route = express.Router(); // patron que funciona con closures, no new.

// Cargamos nuestro modelo de los agentes: models
const Agente = require('../../models/Agente');

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
/*
* GET /agentes/
* Devuelve una lista de agentes:
*/
route.get('/', async (req, res, next) => {

  // NOTA: Aqui vemos como el controlador recibe los datos que vienen por HTTP y se los pasa limpios al modelo, el controlador sirve de interlocutor. Los modelos son ajenos a lo datos asi el modelo se puede usar en cualquier lado sin depender de nada.

  /*
  Con esto tenemos lo que es prescidible para una API:
  - paginar,
  - elegir los campos,
  - ordenar los resultados, y
  - filtar.
  */

  // Version con promesas y async await:
  // Agente.find().then() // Aqui tenemos un objeto que simula una promesa un thenable.
  // Con el try catch manejos el error y se lo mandamos al menejador de errores: Es lo mas recomendado:
  try {
    // Vamos a limitar las peticiones: Anexo video 6 Pondremos una limitacion: Nosotros para validar:
    // http://localhost:3000/apiv1/agentes?limit=2
    // Creamos la variable: Captura la query que le pasamos:
    // Me falla si le paso asi:
    // http://localhost:3000/apiv1/agentes?limit=L
    // const limit = req.query.limit;
    // Para evitar que falle le parseamos el valor para que sea numerico: Aunque a mi no me falla: Asi que lo dejos sin el parse para que si le pasamos un valor distinto de numero de fallo:
    const limit = parseInt(req.query.limit);
    console.log(typeof limit);

    // Vamos a colocar un skip para el paginado:
    // http://localhost:3000/apiv1/agentes?limit=2&skip=0
    // http://localhost:3000/apiv1/agentes?limit=2&skip=1
    const skip = parseInt(req.query.skip);

    // Tambien podemos ver los campos que queramos en la peticion: Un filtro de campos: Todo lo da mongoose:
    // http://localhost:3000/apiv1/agentes?limit=2&skip=3&fields=name
    // http://localhost:3000/apiv1/agentes?limit=2&skip=3&fields=name%20age
    // http://localhost:3000/apiv1/agentes?limit=2&skip=3&fields=name%20age%20-_id
    // http://localhost:3000/apiv1/agentes?limit=2&skip=3&fields=-_id
    // Filtra por nombre:
    const fields = req.query.fields;
    console.log(fields);

    // Vamos a filtar por edad:
    // http://localhost:3000/apiv1/agentes?limit=2&sort=age
    // http://localhost:3000/apiv1/agentes?limit=2&sort=-age
    // http://localhost:3000/apiv1/agentes?&sort=age
    // http://localhost:3000/apiv1/agentes?&sort=-age
    const sort = req.query.sort;

    // Vamos a filtar por campos: MUY INTERESANTE:
    // http://localhost:3000/apiv1/agentes?&name=Smith
    // http://localhost:3000/apiv1/agentes?&age=32
    const name = req.query.name;
    const age = req.query.age;
    const filter = {};
    // Si recibimos un name/age lo metemos en el objetos y podemos filtrar:
    if (name) {
      filter.name = name;
    }
    console.log(typeof age);
    if (typeof age !== 'undefined') {
      filter.age = age;
    }

    // NOTA: si le quitamos el .exce() tambien funciona porque lo que decimos arriba de thenable:
    // Await consume la promesa de la que tiene a la derecha:
    // Le pasamos a la consulta el limite:
    // const agentes = await Agente.find().limit(limit).exec();
    // Ahora usamos el metodo estatico del modelo: Agente
    const agentes = await Agente.list({ filter: filter, limit, skip, fields, sort });
    // console.log(agentes);
    // Respondemos el JSON: Devolvemos los datos:
    res.json({ success: true, results: agentes });
    // _____________________________________
    // OJO si queremos retornar a una vista: Creariamos un modulo con este codigo mas el de arriba sin el res.json() que es lo que envia a la API.
    // res.render('index', { user: agentes });
    //--------------------------------------
  } catch (err) {
    next(err);
  }
});

// Vamos a hacer otro metodo para la API:
/**
 * GET /agentes:id
 * Optiene un agente:
 * http://localhost:3000/apiv1/agentes/63978a3fe8b67b225fc6fdf2
 */
route.get('/:id', async (req, res, next) => {
  try {
    // Recojo el parametro de entrada en la peticion: http://localhost:3000/apiv1/agentes=63978a3fe8b67b225fc6fdf2 Busca en BD = _id asi es mongo:
    const _id = req.params.id;
    // Usamos el modelo Agente:
    const agente = await Agente.findById(_id).exec();
    // Si no lo encuentra:
    if (!agente) {
      res.status(404).json({ success: false });
      return;
    }
    // dvolvemos:
    res.json({ success: true, result: agente });
  } catch (err) {
    next(err)
  }
})

/**
 * Metodo para crear agentes y subirlos a la BD:
 * POST /agentes
 * Crear un agente.
 * Tenemos el middeware que crea agente por medio del metodo post.
 * http://localhost:3000/apiv1/agentes
 * Lo hacemos por medio de Postman
 * Metodo POST pasando informacion por el body en x-www-form-urlencoded
 */
route.post('/', async (req, res, next) => {
  try {
    // En req.body tenemos los datos del post, un objeto {}:
    console.log(req.body);

    const data = req.body;

    // Creamos un  nuevo objeto de tipo agente: DUDA ESTE AGENTE QUIEN LO CREA. Revisar docum mongoose.
    // Creo que lo que guarda es lo del esquema;
    // Confirmado que es el esquema el que crea el agente, lo he comprobado al poner un parametro mas al esquema y crearlo.
    // Esto del modelo es como creo recordar las clases.
    // Este agente lo crea el modelo:
    const agente = new Agente(data);
    console.log(agente);

    // Lo guardamos en la BD: metodo .save().
    const agenteGuardado = await agente.save();

    res.json({ success: true, result: agenteGuardado });
    /*
    Vemos la salida: Lo que nos guarda, olvidarnos del __v:0 eso es de mongoose para el versionado:
    _id: 63982588d56233586e40cda8
    name: "Layka"
    age: 23
    __v: 0
    */
  } catch (err) {
    next(err);
  }
})

/**
 * PUT /agentes:id
 * Actualiza un agente
 * Este middeware actualiza un agente en BD pasandole un id a la url del agente que se quiere actualizar.
 * http://localhost:3000/apiv1/agentes/63982724f386d88e899caa7c
 * Lo hacemos por medio de Postman
 * Metodo POST pasando informacion por el body en x-www-form-urlencoded
 */
route.put('/:id', async (req, res, next) => {
  try {

    // Recogemos el valor que nos pasan por la url:
    const _id = req.params.id;
    console.log(_id);

    // Recogemos los datos que nos pasan por el body:
    const data = req.body;
    console.log(data);

    // OJO al metodo findOneAndUpdate(), lo que recibe por parametros:
    // { new: true} hace que retorne la version agente modificada en bd:
    const agenteModificado = await Agente.findOneAndUpdate({ _id: _id }, data, { new: true }).exec();
    res.json({ success: true, result: agenteModificado });

  } catch (err) {
    next(err);
  }
})

/**
 * DELETE /agentes:id
 * Eliminamos un agente con el id que nos pasen.
 * http://localhost:3000/apiv1/agentes/63982724f386d88e899caa7c
 * Lo hacemos por medio de Postman
 */
route.delete('/:id', async (req, res, next) => {
  try {

    // Recogemos el valor que nos pasan por la url:
    const _id = req.params.id;
    console.log('ID:', _id);

    // Metodo para eliminar pasandole el metodo deleteOne(): Recibe un objeto:
    await Agente.deleteOne({ _id: _id }).exec();

    res.json({ success: true });

  } catch (err) {
    next(err);
  }
})

// Exportamos el route para engancharlo en app.js
module.exports = route;
