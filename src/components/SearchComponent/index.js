import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';


class SearchComponent extends Component {

  state = {
    name: '',
    exactMatch: false,
    searchResults: []
  };

  submit = (event) => {
    event.preventDefault();
    if (this.state.name.trim()) {
      this.props.onApply();
    }    
    if(this.state.searchResults.length > 4) {
      this.state.searchResults.shift();
    }
    this.setState({
      searchResults: [...this.state.searchResults, this.state.name]
    })
  }

  render() {
    return (
      <div> 
        {this.state.searchResults.length > 0 && <h4>Last 5 Search Results</h4>}
        {this.state.searchResults.map((item) =>
        <ul>
          <li key={item} item={item}>{item}</li>
        </ul>
        )}
        <form className="search-bar" onSubmit={this.submit}>
          <input
            className="search-bar__field"
            type="text"
            value={this.state.name}
            placeholder="Character search (eg. Thor)"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <button className="search-bar__submit" type="submit">Search</button>
        </form>
      </div>
    );
  }

}

SearchComponent.propTypes = {
  onApply: PropTypes.func,
};

SearchComponent.defaultProps = {
  onApply: () => { },
};

export default SearchComponent;