import React, { Component } from "react";
import PatientFormRedux from "../../components/patient-form";
import { withRouter } from "react-router-dom";
//Redux
import { connect } from "react-redux";

class EditPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined) {
      this.props.history.goBack();
    } else if (state !== null && state.id !== -1) {
      let patient = this.props.patients.find((patient) => patient.medico.id === state.id);
      this.setState({
        patient: patient
      })
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    this.goBack();
  };

  render() {
    let { patient } = this.state;
    let { id } = this.props.location.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          { patient !== undefined || id === -1 ? (
            <PatientFormRedux
              patient={id === -1 ? null : patient}
              submitForm={this.submitForm}
              goBack={this.goBack}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  patients: state.users,
});

const mapDispatchActions = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchActions)(EditPatient)
);