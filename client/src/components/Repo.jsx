import React from 'react';

const Repo = ({ repo }) => {
  return (
    <div className='repo'>
      <div>{repo.name}</div>
      <div>{repo.url}</div>
    </div>
  )
}



export default Repo;