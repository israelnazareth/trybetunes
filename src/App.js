import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      statusLogged: false,
    };
  }

  successfulLogin = () => {
    this.setState({
      statusLogged: true,
    });
  }

  render() {
    const { statusLogged } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {statusLogged ? <Redirect to="/search" />
              : <Login successfulLogin={ this.successfulLogin } />}
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
