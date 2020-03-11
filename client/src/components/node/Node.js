import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import NodeHeader from "./NodeHeader";
import NodeAbout from "./NodeAbout";
import NodeCreds from "./NodeCreds";
import NodeGithub from "./NodeGithub";
import Spinner from "../common/Spinner";
import { getNodeByHandle } from "../../actions/nodeActions";

class Node extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getNodeByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.node.node === null && this.props.node.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { node, loading } = this.props.node;
    let nodeContent;

    if (node === null || loading) {
      nodeContent = <Spinner />;
    } else {
      nodeContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/nodes" className="btn btn-light mb-3 float-left">
                Back To Nodes
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <NodeHeader node={node} />
          <NodeAbout node={node} />
          <NodeCreds education={node.education} experience={node.experience} />
          {node.githubusername ? (
            <NodeGithub username={node.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="node">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{nodeContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Node.PropTypes = {
  getNodeByHandle: PropTypes.func.isRequired,
  node: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  node: state.node
});
export default connect(
  mapStateToProps,
  { getNodeByHandle }
)(Node);
