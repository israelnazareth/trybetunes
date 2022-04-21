import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
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

  fetchFavoriteSongs = async () => {
    const { musicsFromURL: { trackId } } = this.props;
    const response = await getFavoriteSongs();
    const songId = response.some(song => song.trackId === trackId);
    if (songId) {
      this.setState({
        checked: true,
      });
    };
  }

  render() {
    const { musicsFromURL: { previewUrl, trackName, trackId } } = this.props;
    const { loading, checked } = this.state;
    const sectionPage = (<>
      <p>{trackName}</p>
      <section className='track-data'>
        <audio data-testid="audio-component" src={previewUrl} controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={trackId}
          data-testid={`checkbox-music-${trackId}`}
        >
          Favoritar
          <input
            type="checkbox"
            id={trackId}
            checked={checked}
            onChange={this.handleChange}
          />
        </label>
      </section>
    </>
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
