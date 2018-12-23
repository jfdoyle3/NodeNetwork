//Add ins
import React, { Component } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'


// Redux Store
import store from "./store"

//Components
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Footer from "./components/layout/Footer"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

// Style Sheet
import "./App.css";

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
