import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
  }

  activateButton = ({ target: { value } }) => {
    const minimumChars = 2;
    this.setState({
      disabled: value.length < minimumChars,
    });
  }

  render() {
    const { disabled } = this.state;
    return (
      <main data-testid="page-search">
        <Header />
        <p>Search</p>
        <form>
          <input
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.activateButton }
          />
          <button
            disabled={ disabled }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </main>
    );
  }
}

export default Search;
