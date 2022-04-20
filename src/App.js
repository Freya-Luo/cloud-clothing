import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './routes/home/home.jsx';
import Shop from './routes/shop/shop.jsx';
import Header from './components/header/header.jsx';
import LoginOrRegister from './routes/login-register/login-register.jsx';

import { auth, createUser } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(async (curUser) => {
      if (curUser) {
        const userRef = await createUser(curUser); // store the user in the database

        userRef.onSnapshot((userSnapshot) => {
          // store the user in our app's state
          this.setState(
            {
              user: {
                id: userSnapshot.id, // id gets from the snapshot
                ...userSnapshot.data(), // while other props (in createUser()) are stored in data()
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        this.setState({ user: curUser });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Header isLogin={this.state.user} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route path='/login' component={LoginOrRegister} />
        </Switch>
      </div>
    );
  }
}

export default App;
