// Add ins
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// Actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentNode } from "./actions/nodeActions";

// Functions
import setAuthToken from "./utils/setAuthToken";

// Redux Store
import store from "./store";

// Private Authenticated Route
import PrivateRoute from "./components/common/PrivateRoute";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateNode from "./components/create-node/CreateNode";
import EditNode from "./components/edit-node/EditNode";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Nodes from "./components/nodes/Nodes";
import Node from "./components/node/Node";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

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
    store.dispatch(clearCurrentNode()); // Clear Node
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
              <Route exact path="/nodes" component={Nodes} />
              <Route exact path="/node/:handle" component={Node} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-node"
                  component={CreateNode}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-node" component={EditNode} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
