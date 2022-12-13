'use strict';

const axios = require('axios');

function getStar() {
  axios.get('https://swapi.dev/api/people')
    .then((response) => {
      console.log(response.data);
    }).catch(err => {
      console.log('Error', err);
    })
}

// getStar();

// Lo hacemos contra nuestra api:
function getMyApi() {
  axios.get('http://localhost:3000/apiv1/agentes')
    .then((resp) => {
      console.log(resp.data);
      console.log(resp.data.results);
      console.log(resp.data.results[4]);
      console.log(resp.data.results[4].name);
    }).catch(err => {
      console.log('Error', err);
    })
}

getMyApi();