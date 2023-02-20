import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name } = await getUser();
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component" className='header-component'>
        <h1>TrybeTunes</h1>
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : userName }
        </h2>
        <Link to="/search" data-testid="link-to-search"><p>Search</p></Link>
        <Link to="/favorites" data-testid="link-to-favorites"><p>Favorites</p></Link>
        <Link to="/profile" data-testid="link-to-profile"><p>Profile</p></Link>
      </header>
    );
  }
}

export default Header;
