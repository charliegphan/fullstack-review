const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const fetch = require('../database/index').fetch;
const save = require('../database/index').save;

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

app.post('/repos', function (req, res) {
  const user = req.body.term;

  getReposByUsername(user, (body) => {
    const repos = JSON.parse(body);
    save(repos, (err, repo) => {
      console.log(repo);
      if (err) {
        throw err;
      } else {
        res.sendStatus(201);
      }
    })

  })
});

app.get('/repos', function (req, res) {
  console.log(req.body);
  fetch((err, repos) => {
    if (err) {
      throw err;
    }
    res.send(repos);
  });
});

const port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

