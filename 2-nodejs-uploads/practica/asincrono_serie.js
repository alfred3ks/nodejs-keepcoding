'use strict';
// Haremos una función que recibe un texto y tras 2 segundos lo escriba en la consola varias veces.

console.log('Empiezo');

// funcion que escribe texto en consola tras 2 seg:
function escribeTras2Segundos(texto, callback) {
  // Esta función ocurrira mas adelante: Hacemos una operacion asincrona con setTimeout(), la cual recibe una funcion como callback.
  setTimeout(() => {
    console.log(texto);
    // Aqui llamamos la funcion que viene por parametros.
    callback();
  }, 2000)
}

// Creamos nuestra funcion para crear recursividad, osea una funcion que se llama a si misma:
// bucle asincrono en serie: Llamar a una funcion n veces en serie y al terminar llamar al callbackFinalizacion:
function serie(n, fn, callbackFinalizacion) {
  if (n === 0) {
    callbackFinalizacion();
    return;
  }
  n = n - 1;
  fn('Texto ' + n, function () {// fn seria la llamada a escribeTras2Segundos
    // Aqui vemos la recursividad, se llama a si misma:
    serie(n, fn, callbackFinalizacion);
  })
}

// El callbackFinalizacion se pasa como tercer parametro:
serie(5, escribeTras2Segundos, function () {
  console.log('FIN');
})

/*
Esto seria un ejemplo de como hacernos una funcion que nos entregue un texto tras 2 segundos en serie.

Esta es una funcion que le pasamos el numero de veces que queremos que se repita, ahora vamos a ver si en vez de pasarle un numero tenemos un array:
Lo vemos en el ejemplo: asincrono_serie_array.js

*/
