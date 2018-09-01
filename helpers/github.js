const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  let options = {
    url: `https://api.github.com/users/${user}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      throw error;
    }
    cb(body);
  });

};

module.exports.getReposByUsername = getReposByUsername;