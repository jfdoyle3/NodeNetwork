import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import NodeItem from "./NodeItem";
import { getNodes } from "../../actions/nodeActions";

class Nodes extends Component {
  componentDidMount() {
    this.props.getNodes();
  }
  render() {
    const { nodes, loading } = this.props.node;
    let nodeItems;
    if (nodes === null || loading) {
      nodeItems = <Spinner />;
    } else {
      if (nodes.length > 0) {
        nodeItems = nodes.map(node => <NodeItem key={node.id} node={node} />);
      } else {
        nodeItems = (
          <h4>
            No Coders...
            <br />
            Be the first to <Link to="/register">Sign Up</Link>
          </h4>
        );
      }
    }
    return (
      <div className="nodes">
        <div className="container">
          <div className="row">
            <div className="col-mid-12">
              <h1 className="display-4 text-center">Coders</h1>
              <p className="lead text-center">Browse and connect with coders</p>
              {nodeItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Nodes.propTypes = {
  getNodes: PropTypes.func.isRequired,
  node: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  node: state.node
});
export default connect(
  mapStateToProps,
  { getNodes }
)(Nodes);
