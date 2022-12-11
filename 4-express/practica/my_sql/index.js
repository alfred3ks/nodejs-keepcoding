// Vamos a ver la conexion con mysql:
'use strict';
// Cargo el driver de mysql:
const mysql = require('mysql');

// Creo una conexion: Nos conectaremos a una BD del profesor:
// No funciona:
// const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');

// conecto: Codigo profesor:
//   conexion.query('SELECT * FROM agentes', (err, rows, fields) => {
//     if (err) {
//       console.log('Error:', err);
//       return;
//     }
//     console.log(rows);
//   });
// });

// Hago conexion a BD local con mysql: mia:
const conexion = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'usuarios_db'
});

// Conecto: A mi bd:
conexion.connect((err) => {
  // Lanzo consulta:
  conexion.query('SELECT * FROM ifp_cliente', (err, rows, fields) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.log(rows);
  });
});

