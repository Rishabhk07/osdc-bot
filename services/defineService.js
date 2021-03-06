'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  define: (callback, username, term) => {
    request({
      url: `${constants.DEFINE_API_URL}?term=${term}`,
      headers: {
        'X-Mashape-Key': constants.DEFINE_API_KEY
      },
      method: 'GET'
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let message = '\n';
        const parsed = JSON.parse(body);
        parsed.list.forEach((listItem) => {
          message += `* ${listItem.definition}\n\n**Example**\n\n`;
          message += `> ${listItem.example}\n\nby *${listItem.author}*  `;
          message += `:thumbsup: ${listItem.thumbs_up.toString()} `;
          message += `:thumbsdown: ${listItem.thumbs_down.toString()}\n`;
        });
        callback(message, username);
      }
    });
  }
};

