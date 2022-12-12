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
  }
}, { collection: 'agentes' });

// Creamos el modelo que vamos a usar:
const Agente = mongoose.model('Agente', agenteSchema);
// Aqui vamos a hacer una aclaracion vemos el string que pasamos 'Agente' lo que hace mongoose es pluralizarlo y ponerlo todo en mayuscula y buscar eso en la bd. Como vemos el nuestro es agentes. Hay una forma de evitar eso pasandolo en el schema arriba lo vemos como:
// { collection: 'agentes'})


// Esto tambien es opcional porque se podria recuperar desde mongoose:
module.exports = Agente;

// Ahora vamos teniendo ya el modelo y lo cargamos en app.js