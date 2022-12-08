'use strict';
// Closure:
function create(numero) {
  // Devolvemos un objeto:
  return {
    porDos: function () {
      // aqui vemos un closure ya que numero no pertenece a este contexto, pertenece al contexto superior:
      const resultado = numero * 2;
      console.log('El resultado es:', resultado);
      return resultado;
    }
  };
}

const resultado7 = create(7);
const resultado9 = create(9);
const resultado3 = create(3);
// console.log(resultado7.porDos());
// console.log(resultado9.porDos());

// Hacemos la prueba del algodon con el setTimeout: Los metodos creados con closures no pierden el el acceso al objeto propietarios (this) ya que no lo tienen.
setTimeout(resultado3.porDos, 2000);

// Ahora veamos que otro objeto le pide prestado su metodo:
const resultado4 = create(4);
const otroObjet = {
  porDos: resultado4.porDos
}

otroObjet.porDos();