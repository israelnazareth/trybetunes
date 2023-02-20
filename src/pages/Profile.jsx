import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    const profileInfo = (
      <div data-testid="page-profile">
        <img
          data-testid="profile-image"
          src={image}
          alt={`Profile img from ${name}`}
        />
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );

    return (
      <div style={{ textAlign: 'center' }}>
        <Header />
        <p>Profile</p>
        {loading ? <Loading /> : profileInfo}
        <h1>Em desenvolvimento</h1>
      </div>
    );
  }
}

export default Profile;
