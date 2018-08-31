const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log(user, 'githubjs');
  let options = {
    url: `https://api.github.com/users/${user}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  console.log(options);

  request(options, (error, response, body) => {
    if (error) {
      throw error;
    }

    cb(body);
  });

};

module.exports.getReposByUsername = getReposByUsername;