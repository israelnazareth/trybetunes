import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleChange = async ({ target: { id, checked } }) => {
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(id);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(id);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  render() {
    const { musicsFromURL: { previewUrl, trackName, trackId } } = this.props;
    const { loading, checked } = this.state;
    const sectionPage = (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            checked={ checked }
            onChange={ this.handleChange }
          />
        </label>
      </section>
    );

    return (
      loading ? <Loading /> : sectionPage
    );
  }
}

MusicCard.propTypes = {
  musicsFromURL: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
