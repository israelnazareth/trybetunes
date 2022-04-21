import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import Card from './Card';

class CardList extends Component {
  render() {
    const { albums } = this.props;
    return (
      <span className='card-list'>
        {albums.length === 0 ? <NotFound />
          : albums.map((item) => <Card album={ item } key={ item.collectionId } />) }
      </span>
    );
  }
}

CardList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardList;
