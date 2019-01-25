import React from "react";
import { Link, withRouter} from 'react-router-dom';
import {TextFieldGroup} from '../common/TextFieldGroup';
import {TextAreaGroup} from '../common/TextAreaGroup';
import {connect} from 'react-redux';
import Prop-types from 'prop-types';


 class AddExperience extends Compnonent {
   constructor(props){
     super(props);
    this.state={
      comapny:"",
      title:'',
      location:'',
      from:"",
      to:"",
      current: false,
      discription: '',
      error: {},
      disable: false
      };
   }
  render(){
    const {errors}=this.state;
  return (
  <div>
   <div className=" add-experience">
    <div className="container">
     <div className="row">
           <div className="col-md-8 m-auto">
          <link to="/dashboard" className="btn btn-light">Go Back</link>
          <h1 className="display-4 text-center">Add Your Experience</h1>
          <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
          <small className="d-block pb-3">* = required field</small>
          <form action="add-education.html">
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="* Job Title" name="title" required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="* Company" name="company" required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Location" name="location" />
            </div>
            <h6>From Date</h6>
            <div className="form-group">
              <input type="date" className="form-control form-control-lg" name="from" />
            </div>
            <h6>To Date</h6>
            <div className="form-group">
              <input type="date" className="form-control form-control-lg" name="to" />
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" name="current" value="" id="current" />
              <label className="form-check-label" for="current">
                Current Job
              </label>
            </div>
            <div className="form-group">
              <textarea className="form-control form-control-lg" placeholder="Job Description" name="description"></textarea>
              <small className="form-text text-muted">Some of your responsabilities, etc</small>
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
         </div>
         </div>
         </div>
         </div>
         </div>
          
     )
   }
 };
AddExperience.propTypes={
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
mapStateToProps= state =>({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps)(withRouter(AddExperience));