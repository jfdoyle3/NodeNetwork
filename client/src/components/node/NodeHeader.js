import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class NodeHeader extends Component {
  render() {
    const { node } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={node.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{node.user.name}</h1>
              <p className="lead text-center">
                {node.status}
                {isEmpty(node.company) ? null : <span>at {node.company}</span>}
              </p>
              {isEmpty(node.location) ? null : <p>{node.location}</p>}
              <p>
                {isEmpty(node.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(node.social && node.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(node.social && node.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(node.social && node.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(node.social && node.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
                {isEmpty(node.social && node.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={node.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NodeHeader;
