/*
-- Promesas: La solucion a los callbacks para evitar callbacks hell
Para esta información tenemos un pdf llamado: KCW_Prom_DB_API.pdf

Una promesa es un objeto que representa una operación que aún no se ha completado, pero que se completará más adelante.
Antes de ES2015 podíamos usarlas con librerías, pero estas librerías tienen ligeras (o no tan ligeras) diferencias entre ellas. Ahora ya forman parte del estándar y el lenguaje y no necesitamos estas librerías.

Tiene tres estados posibles (https://promisesaplus.com/)
  1. Pending
  2. Fullfilled(value)
  3. Rejected(reason)

Cuando una promesa está en uno de los dos estados fulfilled o rejected se le llama settled.
Si la promesa se hubiera cumplimentado (fulfilled) o rechazado (rejected) antes de asignarle un then o catch, cuando se le asignen serán llamados con el resultado o el error.

Como se hace:
var promesa = new Promise(function(resolve, reject) {
  // llamo a resolve con el resultado
  // o llamo a reject con el error
});
promesa.then( function(resultado) {
}).catch( function(error) {
});

Como el .then() retorna una promesa podemos concatenar mas promesas, pero para eso necesitamos el return.

*/
'use strict';

const { resolve } = require('path');

const fsPromise = require('fs').promises;

// Funcion que retorna una promesa:
function sleep(ms) {
  return new Promise((resolve, reject) => {
    // Aqui va el codigo que hara resolver o rechazarse la promesa:
    setTimeout(() => {
      // Resolvemos:
      // resolve();
      // resolve('Soy un string');
      resolve({ nombre: 'Luis' });
      // O la rechazamos:
      // reject(new Error('Fatal'));
    }, ms);
  });
}

// Aqui vemos la funcion anterior pero en una sola linea:
const sleepBis = ms => new Promise(resolve => setTimeout(resolve, ms));

// obtener la promesa:
const promesa = sleep(2000);
console.log(promesa); // Promise { <pending> }

// Consuminos la promesa:
promesa
  .then((resp) => {
    console.log('Se completo la promesa 1:', resp);
    return resp; // .then() devuelve una promesa y si nosotros retornamos algo esa promesa se resuelve con ese algo.
  })
  .then((resp) => {
    return sleep(2000)
      // aqui se recibe la promesa del anterior
      .then(() => {
        console.log('Se completo la promesa 2:', resp);
        return resp;
      })
  }) //.then() devuelve una promesa que se puede consumir con otro .then() por eso el return
  .then((resp) => {
    return sleep(2000)
      .then(() => {
        console.log('Se completo la promesa 3:', resp);
        return resp;
      })
  })
  .then((resp) => {
    return sleep(2000)
      .then(() => {
        console.log('Se completo la promesa 4:', resp);
        return resp;
      })
  })
  //.catch tambien devuelve una promesa:
  .catch(err => console.log('Promesa rechazada:', err));

// Esta promesa antes ya fue completada arriba y vemos que podemos volver a ejecutarla:
setTimeout(() => {
  // Me suscribo a una promesa ya completada:
  promesa.then((resp) => {
    console.log('Promesa inicial completada', resp);
  })
}, 5000)