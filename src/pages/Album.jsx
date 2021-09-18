import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      arrayOfMusic: [],
    };
  }

  componentDidMount() {
    this.requestMusics();
  }

  requestMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsFromURL = await getMusics(id);
    this.setState({
      arrayOfMusic: [...musicsFromURL],
      artistName: musicsFromURL[0].artistName,
      albumName: musicsFromURL[0].collectionName,
      albumImage: musicsFromURL[0].artworkUrl100,
    });
  }

  render() {
    const { arrayOfMusic, artistName, albumName, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h1 data-testid="album-name">{ albumName }</h1>
          <img src={ albumImage } alt={ `Album: ${albumName}` } />
          <h3 data-testid="artist-name">{ artistName }</h3>
        </section>
        { arrayOfMusic.slice(1)
          .map((music, index) => <MusicCard musicsFromURL={ music } key={ index } />) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
