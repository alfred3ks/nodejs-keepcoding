'use strict';
// cargar libreria:
const mongoose = require('mongoose');
const conn = mongoose.connection;

// gestionar eventos de la conexion:
conn.on('err', (err) => {
  return console.log('Error de conexion', err);
  // Si no hay conexion para la app:
  process.exit(1);
});

// Creamos otro evento cuandose produce open una vez: Lo vemos en el log:
conn.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
})

// Con esto quitamos error de consola, un warning de deprecados: Buscado por internet
mongoose.set('strictQuery', false);
// conectar: a un uri
// mongoose.connect('mongodb://localhost:27123/cursonode', { useNewUrlParser: true }); // si el puerto es diferente al predeterminado.
// mongoose.connect('mongodb://127.0.0.1:27017/cursonode', { useNewUrlParser: true }); // Localhost no conecta OJO:
mongoose.connect('mongodb://127.0.0.1:27017/cursonode', { useNewUrlParser: true });

// exportamos la conexion: (opcional):
module.exports = conn; // Lo cargamos donde arranca nodeAPI. app.js

