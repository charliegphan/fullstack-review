import React from 'react';

const Repo = ({ repo }) => {
  return (
    <div className='repo'>
      <img style={{
        height: '50px',
        width: '50px'
      }} src={repo.picture}></img>
      <div>{repo.name}</div>
      <a href={repo.url}>{repo.url}</a>
    </div>
  )
}



export default Repo;