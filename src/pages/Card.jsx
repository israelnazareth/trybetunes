import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { album: {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId,
    } } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ `Album art ${collectionName}` } />
        <h4>{ collectionName }</h4>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          More Info
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  album: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default Card;
