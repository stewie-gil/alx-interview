#!/usr/bin/node
// Prints all characters of a Star Wars movie:

const request = require('request');

const id = process.argv[2];

const url = `https://swapi-api.alx-tools.com/api/films/${id}`;

request(url, async function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const jsonBody = JSON.parse(body);
    const characters = jsonBody.characters;
    for (const charc of characters) {
      const resp = await new Promise((resolve, reject) => {
        request(charc, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            const bodyJson = JSON.parse(body);
            resolve(bodyJson.name);
          }
        });
      });
      console.log(resp);
    }
  }
});
