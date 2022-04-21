import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      arrayOfMusic: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    const getSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      arrayOfMusic: getSongs,
    });
  }

  render() {
    const { loading, arrayOfMusic } = this.state;
    const favoritePage = (
      <div data-testid="page-favorites">
        <Header />
        <main className='favorites-page'>
          <h1>Favorites</h1>
          { arrayOfMusic.length
          ? arrayOfMusic
              .map((music, index) =>
              <MusicCard musicsFromURL={ music } key={ index }
              />)
              : <h2>Você não favoritou nenhuma música. :'(</h2> }
        </main>
      </div>
      );
    return (
      loading ? <Loading /> : favoritePage
    );
  }
}

export default Favorites;
