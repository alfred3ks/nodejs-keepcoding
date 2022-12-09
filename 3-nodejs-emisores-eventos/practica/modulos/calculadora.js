'use strict';
console.log('Inicializo el módulo');

function suma(a, b) {
  return a + b;
}

function resta(b, a) {
  return b - a;
}

// Exportamos la funcion: Si no ponemos el export lo que recibe el index es un objeto vacio {} que es module.export
module.exports.sum = suma;

// Sintaxis abreviada para exportar: Usando un alias:
exports.res = resta;

// Otra forma de exportar:
module.exports.multip = function (a, b) {
  return a * b;
}
