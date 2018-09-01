const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }, // html_url - will use this for uniqueness
  name: String, // login
  picture: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (saveUser, cb) => {

  Repo.find({ url: saveUser.html_url }, (err, repo) => {
    if (err) {
      console.log(err);
    }

    if (repo.length === 0) {
      console.log('repo does not exist');

      const newRepo = new Repo({
        url: saveUser.html_url,
        name: saveUser.name,
        picture: saveUser.avatar_url
      })

      newRepo.save((err, repo) => {
        if (err) {
          throw err;
        } else {
          cb(err, repo);
        }
      });
    } else {
      cb(err, repo);
    }
  })
}

const fetch = (cb) => {
  Repo.find({}, (err, repos) => {
    if (err) {
      cb(err)
    }
    cb(err, repos);
  });
}

module.exports = {
  save: save,
  fetch: fetch
}