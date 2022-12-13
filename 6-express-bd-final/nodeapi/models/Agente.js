'use strict';
// cargar libreria:
const mongoose = require('mongoose');

// Definimos un esquema para nuestra bd:
// Esta Pagina esta genial para definir los esquemas: https://mongoosejs.com/docs/schematypes.html
// Estos eschemas son como cuando cramos las tablas en sql, algo parecido:
// En nuestra BD no tenemos email esta es como ejemplo como seria agregarle mas propiedades:
const agenteSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    index: true,
    unique: true
  },
  nationality: String
},
  { collection: 'agentes' }
);

// Creamos un metodo estatico lo vemos en el pdf:
// Crear un método estático a un modelo: Para usarlo en el controlador:
// En los metodos de modelos de mongoose no usar arrow function perdemos el this a la instancia:
// Recibe un objeto por parametro.
agenteSchema.statics.list = function ({ filter, limit, skip, fields, sort }) {
  // Guardamos la consulta:
  const query = Agente.find(filter);
  query.limit(limit);
  query.skip(skip);
  // Este es distinto filtra con el metodo select()
  query.select(fields);
  query.sort(sort);

  // Retornamos toda de una vez:
  return query.exec();
  // Esta metodo la usamos en el controlador.
}

// Creamos el modelo que vamos a usar:
const Agente = mongoose.model('Agente', agenteSchema);
// Aqui vamos a hacer una aclaracion vemos el string que pasamos 'Agente' lo que hace mongoose es pluralizarlo y ponerlo todo en mayuscula y buscar eso en la bd. Como vemos el nuestro es agentes. Hay una forma de evitar eso pasandolo en el schema arriba lo vemos como:
// { collection: 'agentes'})


// Esto tambien es opcional porque se podria recuperar desde mongoose:
module.exports = Agente;

// Ahora vamos teniendo ya el modelo y lo cargamos en app.js y agentes.js