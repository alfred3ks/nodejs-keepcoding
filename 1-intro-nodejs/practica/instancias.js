// Implementamos el use strict:
'use strict';

// Creamos una función para usarla como constructor de objetos:
// - Vemos la convension de poner la primera letra en mayuscula: Para JS esta funcion es igual que cualquier otra, la diferencia es cuando creamos la instancia con el new:
function Fruta(nombre) {
  // This simboliza a el objeto que se esta creando: Al objeto que es "this" le añadimos una propiedad de tipo nombre: this.nombre = nombre;
  this.nombre = nombre;

  // Setters:
  this.setNombre = function (valor) {
    this.nombre = valor;
  }

  // Getters:
  this.getNombre = function () {
    return this.nombre;
  }
}

// Instanciamos un objeto de tipo Fruta:
const limon = new Fruta('Limón');
console.log(limon);
console.log(limon.nombre);