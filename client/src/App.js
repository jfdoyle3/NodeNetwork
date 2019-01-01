// Add ins
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// Actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

// Functions
import setAuthToken from "./utils/setAuthToken";

// Redux Store
import store from "./store";

// Private Authentcated Route
import PrivateRoute from "./components/common/PrivateRoute";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

// Style Sheet
import "./App.css";

// Check for Token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); // Set auth token header auth
  const decoded = jwt_decode(localStorage.jwtToken); // Decode token and get user info and exp
  store.dispatch(setCurrentUser(decoded)); // Set user and isAuthenticated
  const currentTime = Date.now() / 1000; // Check for expired token
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); //Logout User
    store.dispatch(clearCurrentProfile()); // Clear Profile
    window.location.href = "/login"; // Redirect to Login
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
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
