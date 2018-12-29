import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  render() {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    return <div>
        <h1>boo! dashboard</h1>
    </div>;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Dashboard);
