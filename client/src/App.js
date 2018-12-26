// Add ins
import React, { Component } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

// Functions
import {setCurrentUser, logoutUser} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';


// Redux Store
import store from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Style Sheet
import "./App.css";

// Check for Token
if (localStorage.jwtToken){
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded=jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for ecpired token
    const currentTime=Date.now() / 1000;
    if(decoded.exp < currentTime){
      //Logout User
      store.dispatch(logoutUser());
      // TODO: clear Profile

      // Redirect to Login
      window.location.href='/login';
    }
}


// Page Output
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
