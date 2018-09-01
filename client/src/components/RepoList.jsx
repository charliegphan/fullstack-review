import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {
      props.repos.map((repo, i) => {
        return <Repo repo={repo} key={i} />
      })
    }
  </div>
)



export default RepoList;