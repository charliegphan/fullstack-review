const request = require('request');
const config = process.env.TOKEN || require('../config.js').TOKEN

let getReposByUsername = (user, cb) => {
  let options = {
    url: `https://api.github.com/users/${user}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config}`
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