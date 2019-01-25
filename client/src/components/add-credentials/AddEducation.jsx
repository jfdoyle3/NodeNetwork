import React from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../action/profileActions";

class AddEducation extends Compnonent {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      discription: "",
      error: {},
      disable: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors){
      this.setState(errors: nextProps.errors)
    }
  }
  
  onSubmit(e) {
    e.preventDefault();
    const expData = {
      school: this.state.school,
      school: this.state.school,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  oncheck(e) {
    this.setState({
      disable: !this.state.disabled,
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="add-Education">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Add Your Education</h1>
                <p className="lead text-center">
                  Add any developer/programming positions that you have had in
                  the past
                </p>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <TextFieldGroup
                    placeholder="* school"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                  <h6>To Date</h6>
                  <TextFieldGroup
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? "disable" : ""}
                  />
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label className="form-check-label" htmlFor="current">
                      Current Job
                    </label>
                  </div>
                  <TextFieldGroup
                    placeholder="Job Descriptio"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Some of your responsabilities, etc"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
