'use strict';
const calculadora = require('./calculadora');
console.log(calculadora);

console.log(calculadora.sum(3, 5));
console.log(calculadora.res(3, 5));
console.log(calculadora.multip(4, 5));

// aqui vemos que es un singleton, apunta al mismo objeto:
calculadora.loquesea = 'algo';
console.log(calculadora.loquesea);