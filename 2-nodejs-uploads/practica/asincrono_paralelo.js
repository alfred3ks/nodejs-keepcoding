'use strict';
// Haremos una función que recibe un texto y tras 2 segundos lo escriba en la consola.

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

// Ahora lo que hacemos es pasar como callback una funcion tambien para que se ejecute los del setTimeout primero y luego el final. Vemos como vamos concatenando funciones callback: Para ver como funciona descomentar:
// escribeTras2Segundos('Hola mundo!!!', function () {
//   console.log('Término');
// });

// Ahora vemos como hacer un bucle asincrono: Repetimos la llamada de la funcion varias veces:
// Los ciclos for() no nos sirven para hacer operaciones asincronas. YA que no espera, se ejecuta uno detras de otro. El for no es sencible a los callback. Para eso debemos usar recursividad, osea una funcion se llame a si misma.
// Si usamos un bucle for(), while(), etc, lanzamos todas las iteraciones en paralelo porque cada vuelta no espera a que termine la anterior.
for (let n = 0; n < 5; n++) {
  escribeTras2Segundos('Hola mundo!!!', function () {
    console.log('Término ' + n);
  });
}
console.log('FIN');
