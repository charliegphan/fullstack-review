const mongoose = require('mongoose');
const URL = process.env.URL || require('../config.js').URL

mongoose.connect(URL);

let repoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  }, // html_url - will use this for uniqueness
  name: String,
  owner: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {
  let counter = 0;
  const reposPromise = repos.map(repo => {
    // THIS IS ASYNCHRONOUS
    // SEND RESPONSE BACK AFTER ALL REPOS HAVE BEEN ADDED
    return new Promise((resolve, reject) => {
      Repo.find({ url: repo.html_url }, (err, queriedRepos) => {
        if (err) {
          reject(err);
        }

        if (queriedRepos.length === 0 && repos.message === undefined) {
          const newRepo = new Repo({
            url: repo.html_url,
            name: repo.name,
            owner: repo.owner.login
          })

          newRepo.save((err, repo) => {
            if (err) {
              reject(err);
            } else {
              resolve(repo);
            }
          });
        }
      })
    }).then((repo) => {
      return repo;
    })
  })

  Promise.all(reposPromise).then((repo) => {
    cb(null, repo)
  })

}

const fetch = (cb) => {
  Repo.find({}, (err, repos) => {
    if (err) {
      cb(err)
    }
    cb(err, repos);
  })
}

module.exports = {
  save: save,
  fetch: fetch
}