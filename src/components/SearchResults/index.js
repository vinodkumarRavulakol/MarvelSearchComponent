import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class SearchResults extends Component {
  state = {

  };

  constructor(props) {
    super(props);
    const { results } = props;

    console.log(results)

    this.id = results.id;
    this.name = results.name;
    this.image = `${results.thumbnail.path}.${results.thumbnail.extension}`;
    this.description = !results.description.length ? 'Description not available.' :
      results.description.length > 100 ?
        results.description.substring(0, 100).split('').concat('...').join('') :
        results.description;
    this.fullDescription = !results.description.length ? 'Description not available.' :
      results.description;
    this.comics = results.comics.items;
    this.series = results.series.items;
  }

  render() {
    return (
      <div className="Character">
        <div className="text-center Character-name"><span className="h3">{this.name}</span></div>
        <div className="Character-image" style={{backgroundImage: `url('${this.image}')`}} />
        <p className="Character-description">
          {this.description}
        </p>
      </div>
    );
  }
}


SearchResults.propTypes = {
  results: PropTypes.object.isRequired,
};

export default SearchResults;