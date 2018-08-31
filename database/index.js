const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  url: String, // html_url - will use this for uniqueness
  name: String, // login
  picture: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (saveUser, cb) => {

  const newRepo = new Repo({
    url: saveUser.html_url,
    name: saveUser.name,
    picture: saveUser.avatar_url
  })

  newRepo.save((err, repo) => {
    if (err) {
      console.error(err);
    }
    cb(repo);
  });
}

module.exports.save = save;