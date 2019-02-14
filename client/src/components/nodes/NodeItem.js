import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class NodeItem extends Component {
  render() {
    const { node } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={node.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{node.user.name}</h3>
            <p>
              {node.status}
              {isEmpty(node.company) ? null : <span> at {node.company}</span>}
            </p>
            <p>
              {isEmpty(node.location) ? null : <span>{node.location}</span>}
            </p>
            <Link to={`/node/${node.handle}`} className="btn btn-info">
              View Node
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {node.skills.slice(0, 4).map((skills, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skills}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

NodeItem.propTypes = {
  node: PropTypes.object.isRequired
};
export default NodeItem;
