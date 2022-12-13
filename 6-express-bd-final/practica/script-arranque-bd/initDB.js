// Vemos como podemos leer un json que tenemos en nuestra File System: OJO esto es sincrono:
const datos = require('./agentes.json');
// Este lee el JSON directo
// console.log(datos);

// Para usar el fs de node para leer un archivo dentro: Tambien es sincrono:
const fs = require('fs'); // NodeJS
const read = fs.readFile('./agentes.json', (err, data) => {
  // Debemos pasarlo a string:
  console.log(data.toString());
});
