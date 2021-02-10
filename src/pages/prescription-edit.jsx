import React, { Component } from "react";
import CustomInput from "../components/utilities/custom-inputs";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";

class EditPrescription extends Component {
  prescriptionsUrl = "/recetas";

  state = {
    receta: {
      folio: "09019312",
      fecha: "22/03/2020 10:53",
    },
    info: {
      readOnly: this.props.location.state.readOnly,
    },
  };

  inputs = {
    paciente: [
      {
        id: 0,
        nombre: "p_curp",
        etiqueta: "CURP:",
        classe: "m-0",
      },
      {
        id: 1,
        nombre: "p_nombre",
        etiqueta: "Nombre:",
        classe: "m-0",
      },
      {
        id: 2,
        nombre: "p_domicilio",
        etiqueta: "Domicilio:",
        classe: "m-0",
      },
      {
        id: 3,
        nombre: "p_edad",
        etiqueta: "Edad:",
        classe: "m-0 col-sm-6 col-12 d-inline-block",
        tipo: "number",
      },
      {
        id: 4,
        nombre: "p_sexo",
        etiqueta: "Sexo:",
        classe: "m-0 col-sm-6 col-12 d-inline-block",
      },
    ],
    medico: [
      {
        id: 0,
        nombre: "med_nombre",
        etiqueta: "Nombre:",
        classe: "m-0",
      },
      {
        id: 1,
        nombre: "med_especialidad",
        etiqueta: "Especialidad:",
        classe: "m-0",
      },
      {
        id: 2,
        nombre: "med_cedula",
        etiqueta: "Dedula:",
        classe: "m-0",
      },
      {
        id: 3,
        nombre: "med_universidad",
        etiqueta: "Universidad:",
        classe: "m-0 col-sm-6 col-12 d-inline-block",
      },
      {
        id: 4,
        nombre: "med_turno",
        etiqueta: "Turno:",
        classe: "m-0 col-sm-6 col-12 d-inline-block",
      },
    ],
    medicamentos: [
      {
        id: 0,
        nombre: "m_nombre",
        etiqueta: "Nombre:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
      {
        id: 1,
        nombre: "m_clave",
        etiqueta: "Clave:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
      {
        id: 2,
        nombre: "m_presentacion",
        etiqueta: "Presentacion:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
      {
        id: 3,
        nombre: "m_empaque",
        etiqueta: "Empaque:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
      {
        id: 4,
        nombre: "m_cantidad",
        etiqueta: "Cantidad:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
        tipo: "number",
      },
      {
        id: 5,
        nombre: "m_dosificacion",
        etiqueta: "Dosificación:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
      {
        id: 6,
        nombre: "m_dias",
        etiqueta: "Dias Admon:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
        tipo: "number",
      },
      {
        id: 7,
        nombre: "m_via",
        etiqueta: "Via Admon:",
        classe: "m-0 col-sm-3 col-12 d-inline-block",
        req: false,
      },
    ],
  };

  async componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined)
      this.props.history.push(this.prescriptionsUrl);
  }

  submit = (values) => {
    this.props.history.push(`${this.prescriptionsUrl}`);
  };

  save() {}

  pdf() {}

  render() {
    let { receta, info } = this.state;
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
                    <CustomInput 
                      classAdd={item.classe}
                      name={item.nombre}
                      label={item.etiqueta}
                      placeholder=" "
                      type={item?.tipo}
                      req={item?.req}
                      disabled={info.readOnly}
                    />
                  </React.Fragment>
                ))}
              </div>

              <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
                <p className="t-blue-l">Datos del médico</p>
                {this.inputs.medico.map((item) => (
                  <React.Fragment key={item.id}>
                    <CustomInput
                      classAdd={item.classe}
                      name={item.nombre}
                      label={item.etiqueta}
                      placeholder=" "
                      type={item?.tipo}
                      req={item?.req}
                      disabled={info.readOnly}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="item-container p-4">
              <p className="t-blue-l m-0">Diagnóstico</p>
              <CustomInput
                name="diagnostico"
                label=""
                placeholder=" "
                disabled={info.readOnly}
              />
            </div>

            <div className="item-container p-4 mt-2">
              <p className="t-blue-l">Medicamentos</p>

              <div className="row col-12 p-0 m-0">
                <div className="col-md-10 col-sm-12 p-0 m-0 mb-2">
                  {this.inputs.medicamentos.map((item) => (
                    <React.Fragment key={item.id}>
                      <CustomInput
                        classAdd={item.classe}
                        name={item.nombre}
                        label={item.etiqueta}
                        placeholder=" "
                        type={item?.tipo}
                        req={item?.req}
                        disabled={info.readOnly}
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
              <CustomInput
                name="indicaciones"
                label=""
                placeholder=" "
                disabled={info.readOnly}
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

export default EditPrescription;
