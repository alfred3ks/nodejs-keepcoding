/*
Vamos a crear nuestro primer servidor básico usando NodeJs:
*/

// Cargamos la libreria http de nodeJS: Lo hacemos con los modulos commonJS de nodeJS por defecto:
const http = require('http');
// Cargamos la libreria que hemos instalado:
const Chance = require('chance');

// Instanciamos para poder usar la libreria:
const chance = new Chance();

// Definimos el servidor:
const server = http.createServer(function (request, response) {
  // Cada peticion se ejecuta esto: Respondemos la cabecera con este objeto response, texto plano:
  // response.writeHead(200, { 'Content-Type': 'text/plain' });
  // Mandamos el texto plano:
  // response.end('Wake up, Neo');

  // Cada peticion se ejecuta esto: Respondemos la cabecera con este objeto response, html:
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // Mandamos el contenido:
  // response.end('<h1>Wake up, <b>Neo</b></h1>');
  // Mostramos el mensaje en HTML con nombres aleatorios:
  response.end('<h1>Wake up, ' + chance.name());

})

// Arrancamos el servidor:
server.listen(1337, '127.0.0.1');
console.log('Servidor arrancado en http://127.0.0.1:1337');

/*
Explicación:
Para arrancar el servidor por medio de la consola:
  node index.js
  OJO de esta forma cada cambio que hacemos en la app debemos parar y volver arracar la el servidor para ver los cambios, ctrl + c paro el servidor.

  Tenemos el metodo .writeHead() del objeto response, son las cabeceras que envia el servidor, podemos enviar el codigo de la respuesta en este caso es 200, todo ok, y el tipo de contenido, primero texto plano y luego html.
  Luego con el metodo .end() del objeto response mandamos lo que deseamos.
*/