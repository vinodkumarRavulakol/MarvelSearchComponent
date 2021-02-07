import React, { Component } from 'react';

class NoResults extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const msg = 'Oops, we couldn\'t find any results. Please try another one.';

    return (
      <div className="no-results">
        <h1>{ msg }</h1>
      </div>
    );
  }
}

export default NoResults;