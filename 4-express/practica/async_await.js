/*
async hace que una función devuelva una promesa. Osea se basa en promesas.
await no bloquea el event loop:

async function saluda() {
    return 'hola';
}
console.log(saluda());  // Promise { 'hola' }
saluda().then(res => console.log(res)); // hola

await consume una promesa.

async function saluda() {
    const nombre = await row.findName();
    return nombre;
}

*/

// Vemos un ejemplo:
'use strict';
// Llamamos al modulo para escribir en el fs:
const fs = require('fs');
const { json } = require('stream/consumers');

// Creamos una funcion que es con callbacks a promesas para escribir en un fichero:
const writeFile = (nombreFichero, contenido) => {
    return new Promise((resolve, reject) => {
        // Funcion con callbacks:
        fs.writeFile(nombreFichero, contenido, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

// Funcion que retorna una promesa:
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('Empiezo');
    // Ahora si puedo hacer un bucle asincrono:
    for (let i = 0; i < 3; i++) {
        await sleep(500);
        // No se ejecuta lo siguiente hasta que no se resuelve la promesa anterior, si no es una promesa se ejcuta sin problema
        console.log('sigo');
    }

    // tenemos un error sincrono: que por medio del async se hace un error asincrono: Por eso un solo .catch abajo:
    // JSON.parse('iiiii');

    // Aqui llamamos la funcion que escribira en el fichero: Gestiono el error concreto aqui:
    try {
        await writeFile('data.txt', 'Hola mundo!!!!');
        // Asi provoco un error:
        // await writeFile('/////data.txt', 'Hola mundo!!!!');
    } catch (error) {
        console.log('Fallo el writeFile', error);
    }
    console.log('Fin.');
}

// Aqui es donde capturamos el fallo:
main()
    .catch((err) => {
        console.log('Hubo un error:', err);
    })
