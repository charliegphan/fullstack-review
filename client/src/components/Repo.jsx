import React from 'react';

const Repo = ({ repo }) => {
  return (
    <div className='repo' style={{ 'marginBottom': '15px' }}>
      <div>{repo.owner}</div>
      <div>{repo.name}</div>
      <a href={repo.url}>{repo.url}</a>
    </div>
  )
}



export default Repo;