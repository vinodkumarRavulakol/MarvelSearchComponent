import React, { Component } from 'react';
import Promise from 'promise';
import { getMarvelCharacters } from './services/MarvelServices';
import './App.css';

import Loading from './components/Loading';
import Error from './components/Error';
import Character from './components/SearchResults';
import Filter from './components/SearchComponent';
import NoResults from './components/NoResults';

class App extends Component {
  state = {
    loading: false,
    filters: {
      name: {
        value: '',
        exactMatch: false,
      }
    },
    characters: [],
    filterVal: ""
  };

  componentWillMount() {
  }

  applyFilters = () => {
    this.search({
      name: this.filters.state.name.trim(),
      exactMatch: this.filters.state.exactMatch,
    }).then(this.afterFilter);
    this.setState({ filterVal: this.filters.state.name})
  }

  search = (options = {}) => {
    this.setState({ loading: true});
    const {
      name,
      exactMatch,
    } = Object.assign({
      name: this.state.filters.name.value,
      exactMatch: this.state.filters.name.exactMatch,
    }, options);

    const p = new Promise((resolve, reject) => {
      getMarvelCharacters({name})
        .then(({ characters }) => {
          this.setState({
            characters
          });
          resolve({ characters });
        })
        .catch((error) => reject(error));
    });
    p.done(() => this.setState({ loading: false }));

    return p;
  }

  resetFilters = () => this.search({ name: '', exactMatch: false }).then(this.afterFilter)

  render() {
    return (
      <div className="App">
        <h1 className="charHead">Marvel Characters</h1>
        <Filter ref={filters => this.filters = filters} onApply={this.applyFilters} />
        {this.state.characters.length == 0 && this.state.filterVal && !this.state.loading && <NoResults />}
        {!this.state.loading &&
          <div className="App-characters">{
            this.state.characters
              .map(c => <Character key={c.id} results={c}/>)
        }</div>}
        {this.state.loading && <Loading />}
      </div>
    );
    <Error />
    //TODO: Define an error messages container.
  }
}

export default App;
