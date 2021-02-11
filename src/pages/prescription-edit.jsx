import React, { Component } from "react";
import CustomInput from "../components/utilities/custom-inputs";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class EditPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receta: {
        folio: "09019312",
        fecha: "22/03/2020 10:53",
      },
      info: {
        readOnly: this.props.location.state.readOnly,
      },
    };
  }
  
  prescriptionsUrl = "/recetas";
  inputs = {
    paciente: [
      {
        id: 0,
        name: "p_curp",
        label: "CURP:",
        classAdd: "m-0",
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
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined)
    
      this.props.history.push(this.prescriptionsUrl);
  }

  submit = (values) => {
    this.props.history.push(`${this.prescriptionsUrl}`);
  };

  save() {}

  pdf() {}

  myComponent = ({ input, meta, objeto }) => (
    <CustomInput
      input={input}
      meta={meta}
      objeto={objeto}
    />
  )


  render() {
    let { receta, info } = this.state;
    console.log("aver", this.inputs.paciente[0].name);
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4 ">
          <div className="item-container mb-2">
            <div className="col-12 d-flex flex-row-reverse pt-2">
              <p className="p-1 m-0 t-sm">{receta.folio}</p>
              <p className="t-blue-l p-1 m-0">Folio:</p>
            </div>
            <div className="col-12 d-flex flex-row-reverse pb-2">
              <p className="p-1 m-0 t-sm">{receta.fecha}</p>
              <p className="t-blue-l p-1 m-0">Fecha/Hora:</p>
            </div>
          </div>

          <form>
            <div className="row m-0">
              <div className="item-container col p-4 mb-2 d-inline-block">
                <p className="t-blue-l">Datos del paciente</p>
                {this.inputs.paciente.map((item) => (
                  <React.Fragment key={item.id}>
                    <Field
                      name={item.name}
                      objeto={!this.state.info.readOnly ? (item) : ({
                        ...item,
                        readOnly: true
                      })}
                      component={this.myComponent}
                    />
                  </React.Fragment>
                ))
                }
              </div>

              <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
                <p className="t-blue-l">Datos del médico</p>
                {this.inputs.medico.map((item) => (
                  <React.Fragment key={item.id}>
                    <Field
                      name={item.name}
                      objeto={!this.state.info.readOnly ? (item) : ({
                        ...item,
                        readOnly: true
                      })}
                      component={this.myComponent}
                    />
                </React.Fragment>
                ))}
              </div>
            </div>

            <div className="item-container p-4">
              <p className="t-blue-l m-0">Diagnóstico</p>
              <Field
                name="Diagnostico"
                objeto={{
                  name: "Diagnostico",
                  readOnly: this.state.info.readOnly
                }}
                      component={this.myComponent}
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
                      objeto={!this.state.info.readOnly ? (item) : ({
                        ...item,
                        readOnly: true
                      })}
                      component={this.myComponent}
                    />
                </React.Fragment>
                  ))}
                </div>

                <div className="col">
                  <button type="button" className="p-2 col c-btn bg-blue-a">
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
                  readOnly: this.state.info.readOnly
                }}
                  component={this.myComponent}
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
                { !info.readOnly ? (
                  <button
                    type="submit"
                    className="c-btn text-center col-lg-auto mt-4 mb-3 ml-2"
                    onClick={() => this.save()}
                  >
                    <p className="l-text m-0 p-0">Guardar</p>
                  </button>
                ) : null}

                <Link
                  className="c-btn text-center col-lg-auto mt-4 mb-3"
                  to={{
                    pathname: `${this.prescriptionsUrl}`,
                  }}
                >
                  <p className="l-text m-0 p-0">
                    {" "}
                    {info.readOnly ? "Volver" : "Cancelar"}{" "}
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const PrescriptionForm = reduxForm({
  form: "formPrescription",
})(EditPrescription);

export default connect(null,null)(PrescriptionForm);
