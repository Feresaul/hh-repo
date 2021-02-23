import React, { Component } from "react";
import CustomInput from "../components/utilities/custom-inputs";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";

class PrescriptionForm extends Component {
  inputs = {
    paciente: [
      {
        id: 0,
        name: "p_curp",
        label: "CURP:",
        classAdd: "m-0",
        readOnly: this.props.info.id === -1 ? false : true,
      },
      {
        id: 1,
        name: "p_nombre",
        label: "Nombre:",
        classAdd: "m-0",
      },
      {
        id: 2,
        name: "p_domicilio",
        label: "Domicilio:",
        classAdd: "m-0",
      },
      {
        id: 3,
        name: "p_edad",
        label: "Edad:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
        type: "number",
      },
      {
        id: 4,
        name: "p_sexo",
        label: "Sexo:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
      },
    ],
    medico: [
      {
        id: 0,
        name: "med_nombre",
        label: "Nombre:",
        classAdd: "m-0",
      },
      {
        id: 1,
        name: "med_especialidad",
        label: "Especialidad:",
        classAdd: "m-0",
      },
      {
        id: 2,
        name: "med_cedula",
        label: "Dedula:",
        classAdd: "m-0",
      },
      {
        id: 3,
        name: "med_universidad",
        label: "Universidad:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
      },
      {
        id: 4,
        name: "med_turno",
        label: "Turno:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
        //readOnly: this.props.info.id === -1 ? false : true,
      },
    ],
    medicamentos: [
      {
        id: 0,
        name: "m_nombre",
        label: "Nombre:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
      {
        id: 1,
        name: "m_clave",
        label: "Clave:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
      {
        id: 2,
        name: "m_presentacion",
        label: "Presentacion:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
      {
        id: 3,
        name: "m_empaque",
        label: "Empaque:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
      {
        id: 4,
        name: "m_cantidad",
        label: "Cantidad:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
        type: "number",
      },
      {
        id: 5,
        name: "m_dosificacion",
        label: "Dosificación:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
      {
        id: 6,
        name: "m_dias",
        label: "Dias Admon:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
        type: "number",
      },
      {
        id: 7,
        name: "m_via",
        label: "Via Admon:",
        classAdd: "m-0 col-sm-3 col-12 d-inline-block",
        required: false,
      },
    ],
  };

  componentDidMount() {
    let prescription = this.props.data;
    let data = null;
    if (this.props.info.id !== -1) {
      data = {
        p_curp: prescription.paciente.curp,
        p_nombre: prescription.paciente.nombre,
        p_edad: prescription.paciente.edad,
        p_sexo: prescription.paciente.sexo,
        p_domicilio: prescription.paciente.domicilio,
        med_nombre: prescription.medico.nombre,
        med_especialidad: prescription.medico.especialidad,
        med_universidad: prescription.medico.univerdidad,
        med_cedula: prescription.medico.cedula,
        med_turno: prescription.medico.turno,
        indicaciones: prescription.indicaciones,
        diagnostico: prescription.diagnostico,
      };
    } else {
      let { medico } = this.props.profile;
      data = {
        med_nombre: medico.nombre,
        med_especialidad: medico.especialidad,
        med_universidad: medico.univerdidad,
        med_cedula: medico.cedula,
        med_turno: medico.turno,
      };
    }
    for (let key in data) {
      this.props.dispatch(change("prescriptionForm", key, data[key]));
    }
  }

  pdf() {}

  componente = ({ input, meta, objeto }) => (
    <CustomInput input={input} meta={meta} objeto={objeto} />
  );

  submitForm = (values) => {
    this.props.submitForm(values);
  };

  render() {
    let { info, goBack } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <div className="row m-0">
            <div className="item-container col p-4 mb-2 d-inline-block">
              <p className="t-blue-l">Datos del paciente</p>
              {this.inputs.paciente.map((item) => (
                <React.Fragment key={item.id}>
                  <Field
                    name={item.name}
                    objeto={{
                      ...item,
                      readOnly:
                        item.readOnly === undefined ? true : item.readOnly,
                    }}
                    component={this.componente}
                  />
                </React.Fragment>
              ))}
            </div>

            <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
              <p className="t-blue-l">Datos del médico</p>
              {this.inputs.medico.map((item) => (
                <React.Fragment key={item.id}>
                  <Field
                    name={item.name}
                    objeto={{
                      ...item,
                      readOnly:
                        item.readOnly === undefined ? true : item.readOnly,
                    }}
                    component={this.componente}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="item-container p-4">
            <p className="t-blue-l m-0">Diagnóstico</p>
            <Field
              name="diagnostico"
              objeto={{
                name: "diagnostico",
                readOnly: info.accion === "ver" ? true : false,
              }}
              component={this.componente}
            />
          </div>

          <div className="item-container p-4 mt-2">
            <p className="t-blue-l">Medicamentos</p>

            <div className="row col-12 p-0 m-0">
              <div className="col-md-10 col-sm-12 p-0 m-0 mb-2">
                {this.inputs.medicamentos.map((item) => (
                  <React.Fragment key={item.id}>
                    <Field
                      name={item.name}
                      objeto={{
                        ...item,
                        readOnly: info.accion === "ver" ? true : false,
                      }}
                      component={this.componente}
                    />
                  </React.Fragment>
                ))}
              </div>

              <div className="col">
                <button
                  disabled={info.accion === "ver" ? true : false}
                  type="button"
                  className="p-2 col c-btn bg-blue-a"
                >
                  <p className="l-text m-0">Agregar</p>
                </button>
              </div>
            </div>
          </div>

          <div className="item-container p-4 mt-2">
            <p className="t-blue-l m-0">Indicaciones</p>
            <Field
              name="indicaciones"
              objeto={{
                name: "indicaciones",
                readOnly: info.accion === "ver" ? true : false,
              }}
              component={this.componente}
            />
          </div>

          <div className="item-container mt-2">
            <div className="d-flex flex-row-reverse pl-4 pr-4">
              <button
                type="button"
                className="c-btn text-center col-lg-auto mt-4 mb-3 ml-2"
                onClick={() => this.pdf()}
              >
                <p className="l-text m-0 p-0">PDF</p>
              </button>
              {info.accion !== "ver" ? (
                <button
                  type="submit"
                  className="c-btn text-center col-lg-auto mt-4 mb-3 ml-2"
                >
                  <p className="l-text m-0 p-0">Guardar</p>
                </button>
              ) : null}

              <button
                className="c-btn l-text col-lg-auto mt-4 mb-3"
                type="button"
                onClick={() => {
                  goBack();
                }}
              >
                {info.accion === "ver" ? "Volver" : "Cancelar"}
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  prescriptions: state.prescriptions,
  profile: state.profile,
});

const PrescriptionFormRedux = reduxForm({
  form: "prescriptionForm",
})(PrescriptionForm);

export default connect(mapStateToProps, null)(PrescriptionFormRedux);
