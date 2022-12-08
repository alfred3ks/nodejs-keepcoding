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
// bucle asincrono en serie: Llamar a una funcion con cada elemento de un arryas en serie y al terminar llamar al callbackFinalizacion:
function serie(arr, fn, callbackFinalizacion) {
  if (arr.length === 0) {
    callbackFinalizacion();
    return;
  }

  // Vamos a extraer uno a uno los valores del array: Lo vemos en la MDN:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
  // Con el metodo .shift() vamos extrayendo y devolviendo esos valores:

  fn('Texto ' + arr.shift(), function () {// fn seria la llamada a escribeTras2Segundos
    // Aqui vemos la recursividad, se llama a si misma:
    serie(arr, fn, callbackFinalizacion);
  })
}

// El callbackFinalizacion se pasa como tercer parametro:
// Vemos el array que le pasamos:
serie([1, 2, 3, 4, 5], escribeTras2Segundos, function () {
  console.log('FIN');
})
