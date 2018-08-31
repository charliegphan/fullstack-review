const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index').save;

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

app.post('/repos', function (req, res) {
  const user = req.body.term;

  getReposByUsername(user, (body) => {
    const saveUser = JSON.parse(body);
    save(saveUser, (repo) => {
      console.log(repo);
    })
    res.sendStatus(201);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

