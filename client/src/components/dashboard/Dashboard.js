import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentNode, deleteAccount } from "../../actions/nodeActions";
import Spinner from "../common/Spinner";
import NodeActions from "./NodeActions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentNode();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth,
      { node, loading } = this.props.node;

    let dashboardContent;
    if (node === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check for Node exists
      if (Object.keys(node).length > 0) {
        dashboardContent = (
          <div>
            <p class="lead text-muted">
              Welcome <Link to={`/node/${node.handle}`}>{user.name}</Link>
            </p>
            <NodeActions />
            <Experience experience={node.experience} />
            <Education education={node.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p class="lead text-muted">Welcome {user.name}</p>
            <p>Please setup a Node</p>
            <Link to="/create-node" className="btn btn-lg btn-info">
              Create Node
            </Link>
          </div>
        );
      }
    }

    return (
      <div class="dashboard">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentNode: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  node: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  node: state.node
});

export default connect(
  mapStateToProps,
  { getCurrentNode, deleteAccount }
)(Dashboard);
