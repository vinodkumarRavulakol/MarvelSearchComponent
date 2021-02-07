import React, { Component } from 'react';

export class SearchTypeControls extends Component {
  render() {
    return (
      <div className="search-type-controls">
        <label htmlFor="selectCharacters">
          <input
            id="selectCharacters"
            name="searchType"
            type="radio"
            checked={ this.props.searchType === 'Characters' }
            onChange={ this.props.onCharactersClick }
          />
          <span>Characters</span>
        </label>
        <label htmlFor="selectSeries">
          <input
            id="selectSeries"
            name="searchType"
            type="radio"
            checked={ this.props.searchType === 'Series' }
            onChange={ this.props.onSeriesClick }
          />
          <span>Series</span>
        </label>
      </div>
    );
  }
}