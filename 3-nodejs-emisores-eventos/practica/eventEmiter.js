'use strict';
// Creamos un emisor de eventos: Usaremos esta libreria de nodejs: Veremos como podemos nosotros generar evento cuando sucede algo:
const EventEmiter = require('events'); // https://nodejs.org/api/events.html
const emisor = new EventEmiter();
const EVENT_LLAMADA_TELEFONO = 'Llamada de telefono';

// Actuamos ante eventos: Esta es la respuesta:
emisor.on(EVENT_LLAMADA_TELEFONO, (info) => {
  // Info es el objeto que viene desde emisor.emit();
  if (info.llamante === 'Mi madre') {
    // Suena:
    console.log('Ring, Ring, Ring', info);
  }
});

emisor.on(EVENT_LLAMADA_TELEFONO, (info) => {
  // Info es el objeto que viene desde emisor.emit();
  if (info.llamante === 'Mi Hijo') {
    // Vibra:
    console.log('brrr, brrr, brrr', info);
  }
});

// Tambien tenemos el metodo .once() que solo pasara la primera vez pero no mas:
emisor.once(EVENT_LLAMADA_TELEFONO, (info) => {
  // Info es el objeto que viene desde emisor.emit();
  if (info.llamante === 'Mi Jefe') {
    // Vibra:
    console.log('brrr, brrr, brrr', info);
  }
});


// Emitimos los eventos eventos: Vemos la salida por consola: Pasamos como segundo parametro un objeto que lo recibira la funcion callback flecha del evento .on()
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'Mi madre' });
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'Mi Hijo' });
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'Mi Jefe' });
