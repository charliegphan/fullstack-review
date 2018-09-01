import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.retrieveRepos = this.retrieveRepos.bind(this);
  }

  retrieveRepos() {
    $.get('http://localhost:1128/repos',
      (repos) => {
        this.setState({ repos: repos })
      });
  }

  componentWillMount() {
    this.retrieveRepos();
  }

  search(term) {
    $.post('http://localhost:1128/repos',
      { term: term },
      () => {
        this.retrieveRepos();
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));