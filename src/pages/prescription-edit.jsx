import React, { Component } from "react";
import PrescriptionFormRedux from "../components/prescription-form";
//Redux
import { connect } from "react-redux";
import { getPrescriptionById } from "../redux/actions/prescription-actions";

class EditPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { state } = this.props.location;
    if (state === undefined || state?.id === undefined) {
      this.props.history.goBack();
      return;
    } else if (state.id !== null && state.id !== -1) {
      this.props.getPrescriptionById(state.id);
    }
  }

  isoToLString(data) {
    let date = new Date(data);
    if (data === null) {
      date = new Date();
    }
    let day = date.getDate();
    let month = date.getUTCMonth();
    let year = date.getFullYear();
    if (data === null) {
      return `${day}/${month}/${year}  ${date.getHours()}:${date.getMinutes()}`;
    }
    return `${day}/${month}/${year}  ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  }

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    this.goBack();
  };

  render() {
    let { prescription } = this.props;
    let { id } = this.props.location.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          {(prescription.id !== undefined && prescription.id === id) ||
          id === -1 ? (
            <div>
                <div className="item-container mb-2">
                  <div className="col-12 d-flex flex-row-reverse pt-2">
                    <p className="p-1 m-0 t-sm">
                      {id !== -1 ? prescription.folio : "--"}
                    </p>
                    <p className="t-blue-l p-1 m-0">Folio:</p>
                  </div>
                  <div className="col-12 d-flex flex-row-reverse pb-2">
                    <p className="p-1 m-0 t-sm">
                      {id !== -1
                        ? this.isoToLString(prescription.fecha)
                        : this.isoToLString(null)}
                    </p>
                    <p className="t-blue-l p-1 m-0">Fecha/Hora:</p>
                  </div>
                </div>
              <PrescriptionFormRedux
                data={id === -1 ? null : prescription}
                info={this.props.location.state}
                goBack={this.goBack}
                submitForm={this.submitForm}
              />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

/*



*/

const mapStateToProps = (state) => ({
  prescription: state.prescription,
});

const mapDispatchActions = {
  getPrescriptionById,
};

export default connect(mapStateToProps, mapDispatchActions)(EditPrescription);
