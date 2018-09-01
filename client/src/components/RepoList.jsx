import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List </h4>
    <div>
      {
        props.repos.map((repo, i) => {
          console.log(repo);
          return <Repo repo={repo} key={i} />
        })
      }
    </div>

  </div>
)



export default RepoList;