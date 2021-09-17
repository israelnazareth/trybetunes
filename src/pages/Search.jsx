import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardList from './CardList';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      value: '',
      loading: false,
      artistFound: false,
      arrayOfAlbums: [],
    };
  }

  activateButton = ({ target: { value } }) => {
    this.setState({ value });
  }

  searchButton = async () => {
    const { value } = this.state;
    this.setState({ loading: true });
    const requestAlbumsAPI = await searchAlbumsAPI(value);
    this.setState({
      nameArtist: value,
      value: '',
      artistFound: true,
      loading: false,
      arrayOfAlbums: [...requestAlbumsAPI],
    });
  }

  render() {
    const {
      nameArtist,
      value,
      loading,
      artistFound,
      arrayOfAlbums,
    } = this.state;

    const resultOfArtist = (
      <p>{ `Resultado de álbuns de: ${nameArtist}` }</p>
    );

    const form = (
      <form>
        <input
          value={ value }
          type="text"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.activateButton }
        />
        <button
          disabled={ value.length < 2 }
          type="button"
          data-testid="search-artist-button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <main data-testid="page-search">
        <Header />
        <p>Pesquise pelo artista</p>
        { loading ? <Loading /> : form }
        { artistFound ? resultOfArtist : '' }
        { artistFound ? <CardList albums={ [...arrayOfAlbums] } /> : '' }
      </main>
    );
  }
}

export default Search;
