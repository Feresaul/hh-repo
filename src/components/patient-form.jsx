import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import CustomInput from "./utilities/custom-inputs";

class PatientForm extends Component {
  inputs = {
    data: [
      {
        id: 0,
        name: "nombre",
        label: "Nombre Completo:",
        classAdd: "m-0",
      },
      {
        id: 1,
        name: "curp",
        label: "CURP:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      },
      {
        id: 2,
        name: "edad",
        label: "Edad:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
      {
        id: 3,
        name: "sexo",
        label: "Sexo:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
      {
        id: 4,
        name: "domicilio",
        label: "Domicilio:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { patient } = this.props;

    if (patient !== null) {
      let data = {
        nombre: patient.nombre,
        curp: patient.curp,
        edad: patient.edad,
        sexo: patient.sexo,
        domicilio: patient.domicilio,
      };

      if (data !== null) {
        for (let item in data) {
          this.props.dispatch(change("patientForm", item, data[item]));
        }

        this.setState({
          patient: patient,
        });
      }
    }
  }

  submitForm = (values) => {
    this.props.submitForm(values);
  };

  componente = ({ input, meta, objeto }) => (
    <CustomInput input={input} meta={meta} objeto={objeto} />
  );

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <div className="row m-0">
            <div className="item-container col p-4 mb-2 d-inline-block">
              <p className="t-blue-l">Agregar/Modificar paciente</p>

              {this.inputs.data.map((item) => (
                <React.Fragment key={item.id}>
                  <Field
                    name={item.name}
                    objeto={item}
                    component={this.componente}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="item-container">
            <div className="d-flex flex-row-reverse pl-4 pr-4">
              <button
                type="submit"
                className="prl-1 ml-2 mt-4 mb-3 col-lg-auto l-text c-btn"
              >
                Guardar
              </button>
              <button
                type="button"
                className="c-btn text-center col-lg-auto mt-4 mb-3"
                onClick={() => this.props.goBack()}
              >
                <p className="l-text m-0 p-0">Cancelar</p>
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const error = {};
  return error;
};

const PatientFormRedux = reduxForm({
  form: "patientForm",
  validate,
  enableReinitialize: true,
})(PatientForm);

export default connect(null, null)(PatientFormRedux);
