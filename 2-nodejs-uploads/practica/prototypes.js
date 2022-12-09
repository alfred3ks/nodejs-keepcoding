'use strict';
// Vamos a ver los prototypes: OJO esto es interesante e importante!!!!
// Definimos una funcion constructora de objetos para crear Objetos de tipos persona:
function Persona(nombre) {
  // Definimos las propiedades:
  this.nombre = nombre;
}

console.log(Persona.prototype); // Aqui vemos que el objeto esta vacio {}:

/*
Vamos a asignar al prototypo el metodo: Este metodo no esta en los objetos cuando se crean sino en los prototipos de los objetos. Esto no esta directamente en el objeto. ¿Pero porque se la asigamos al prototype y no dentro del propio objeto? Asi cada vez que se crea un objeto se estaria crando un objeto con esa funcion dentro y no es lo ideal, si creamos 1000 objetos tendremos 1000 metodos, asi asignandolo al prototype cuando creemos el objeto este busca el metodo que no lo encuentra lo busca en el prototype y eso solo existe una vez.
*/
Persona.prototype.saluda = function () {
  console.log('Hola me llamo', this.nombre);
}

console.log(Persona.prototype); // Aqui vemos que ya el objeto ya tiene asignado el metodo:

// Contruimos objetos de tipo persona:
const luis = new Persona('Luis');
const pepe = new Persona('Pepe');
const manuel = new Persona('Manuel');

// JS busca en el objeto el metodo, como no lo tiene lo busca por medio de la cadena de protipos y cuando lo encuentra lo ejecuta. Si no existe da error.

luis.saluda();
pepe.saluda();
manuel.saluda();

// Herencia ----------------------------------------:
// Creamos un objeto constructor de tipo Agente que hereda de Persona: Este Agente hereda de Persona.
function Agente(nombre) {
  // Heredamos el constructor de Persona: this es del agente, le asignamos el this que es el agente.
  // Persona.apply(this, [nombre]);
  Persona.call(this, nombre);
  // aqui ya podriamos añadir las propias propiedades del Agente:
}

// Asi hereda las propiedades y metodos: Las 2 lineas son necesarias para que herede los metodos y propiedades:
console.log('Agente.prototype:', Agente.prototype); // tipo Agente {}
Agente.prototype = Object.create(Persona.prototype); // Ahora de tipo Persona, pisamos el del Agente.
console.log(Agente.prototype);
Agente.prototype.constructor = Agente; // Aqui volvemos a asignar su constuctor original que perdio antes:
console.log(Agente.prototype);

// Creamos un agente:
const smith = new Agente('Smith');
console.log(smith.nombre);
smith.saluda(); // Vemos que por herencia ya puede usar el metodo saluda().

console.log(smith instanceof Agente); // true
console.log(smith instanceof Persona); // true
console.log(smith instanceof Object); // true

//------------------------------------------------
// Esto seria que todo lo de JS herendan este metodo, tanto los array, funciones, etc, esto es lo que se llama Monkey patching. Debemos que tener cuidado con esto porque podria alterar el funcionamiento de JS. Este metodo afecta a todos los objetos de JS. Esto NO ES BUENA PRACTICA!!!
Object.prototype.despidete = function () { '...' };
// ------------------------------------------------

// Ahora hacemos herencia multiple ----------------------------------:
// Multiples padres: Para esto usamos el patron de diseño mixins:
// Mixins super heroe: Aportaremos mas capacidades a los Agentes:
function Superheroe() {
  // Solo heredamos un solo constructor, como regla general debe ser asi, un padre legitimo:
  this.vuela = function () {
    console.log(this.nombre, 'Vuela');
  }
  this.esquivaBalas = function () {
    console.log(this.nombre, 'Esquiva balas');
  }
}

// Copiar todas las propiedades y metodos de Supereroe al prototype del Agente:
console.log(Agente.prototype);
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();
smith.esquivaBalas();