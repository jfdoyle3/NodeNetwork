import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class NodesAbout extends Component {
  render() {
    const { node } = this.props;

    // Get first name
    const firstName = node.user.name.trim().split(" ")[0];

    // Skill List
    const skills = node.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fs fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s' Bio</h3>
            <p className="lead">
              {isEmpty(node.bio) ? (
                <span>{firstName} doesn't have a bio</span>
              ) : (
                <span>{node.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NodesAbout.propTypes = {
  node: PropTypes.object.isRequired
};
export default NodesAbout;
