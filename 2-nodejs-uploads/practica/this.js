'use strict';

// This: Cuando pasamos metodos como callback se pierde el this:
// Constructor de objetos:
function Coche(ruedas) {
  this.ruedas = ruedas;

  // Métodos:
  this.cuantasRuedas = function () {
    console.log('Tiene', this.ruedas, 'ruedas.');
  }
}

// Instanciamos: Creamos un objeto:
const todoTerreno = new Coche(4);
todoTerreno.cuantasRuedas(); // Tiene 4 ruedas

/*
Vemos cuando se pierde el this: Llamaremos el metodo sin que el objeto creado este a la izquierda del metodo:
Donde estan los parentesis () lo que hay a la izquierda del punto en esa instruccion:
- Ahora vamos a entender, donde estan los parentesis de cuantasRuedas(), no estan entonces quien ejecutara la funcion? lo hara setTimeout, pero el no tiene ese metodo, aqui se ha perdido el this.
*/

// Aqui pasamos como callback un metodo:
setTimeout(todoTerreno.cuantasRuedas, 2000); //Tiene undefined ruedas

// Otra forma de perdida del this:
// Metemos el metodo dentro de una funcion:
let otraVariable = todoTerreno.cuantasRuedas;
// Aqui vemos la regla de oro, vemos a la izquierda de la funcion otraVariable(), anda no hay nada, entonces es undefined:
// Ejecutamos esa funcion:
// otraVariable(); // Falla

// Ahora ya sabemos como pasar un metodo como callback para evitar que se pierda el this:
// Ahora vemos como solucionarlo, para que un metodo no pierda el this: Hay varias opciones:
// primera opcion: usar el metodo bind()-> devuelve una funcion con el this asignado:
otraVariable = todoTerreno.cuantasRuedas.bind(todoTerreno);
otraVariable(); // Ya tiene el this pegado como un pegamento.

setTimeout(todoTerreno.cuantasRuedas.bind(todoTerreno), 3000);

// Segunda opcion: usar el metodo call() y el metodo apply(), estos dos metodos ejecutan la funcion con un this distinto. Muy usado cuando se hace herencia.
