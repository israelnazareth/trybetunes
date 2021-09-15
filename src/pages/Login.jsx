import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      onLoad: false,
      disabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const minimumChars = 3;
    this.setState({
      disabled: value.length < minimumChars,
      inputName: value,
    });
  }

  submitButton = async (event) => {
    event.preventDefault();
    const { successfulLogin } = this.props;
    const { inputName } = this.state;
    const user = { name: inputName };
    this.setState({ onLoad: true });
    await createUser(user);
    successfulLogin();
  }

  render() {
    const { onLoad, disabled } = this.state;
    return (
      <main data-testid="page-login">
        <p>Login</p>
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              id="name-input"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ disabled }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.submitButton }
          >
            Entrar
          </button>
        </form>
        { onLoad ? <Loading /> : '' }
      </main>
    );
  }
}

Login.propTypes = PropTypes.shape({
  successfulLogin: PropTypes.func,
}).isRequired;

export default Login;
