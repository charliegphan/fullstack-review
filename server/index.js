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
    const saveUser = JSON.parse(body);

    save(saveUser, (err, repo) => {
      if (err) {
        res.send(404);
        throw err;
      } else if (repo.length > 0) {
        res.sendStatus(302)
      } else {
        res.sendStatus(201);
      }
    })

  })
});

app.get('/repos', function (req, res) {
  fetch((err, repos) => {
    if (err) {
      throw err;
    }
    res.send(repos);
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

const port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

