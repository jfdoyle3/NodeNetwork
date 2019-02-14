import React, { Component } from "react";
import { connect } from "react-redux";
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
        nodeItems = <h4>Node not found...</h4>;
      }
    }
    return (
      <div className="nodes">
        <div className="container">
          <div className="row">
            <div className="col-mid-12">
              <h1 className="display-4 text-center">Developer Nodes</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
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
