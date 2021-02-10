import React, { Component } from "react";
//import { connect } from "react-redux";
//import { reduxForm, Field, change } from "redux-form";
import CustomInput from "./utilities/custom-inputs";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";

class EditUser extends Component {
  usersUrl = "/usuarios";

  inputs = {
    data: [
      {
        id: 0,
        nombre: "med_nombreCompleto",
        etiqueta: "Nombre Completo:",
        classeAñadida: "m-0",
        req: false
      },
      {
        id: 1,
        nombre: "med_usuario",
        etiqueta: "Usuario:",
        classeAñadida: "m-0 col-12 col-sm-6 d-inline-block",
      },
      {
        id: 2,
        nombre: "med_contraseña",
        etiqueta: "Contraseña:",
        classeAñadida: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
    ],
    checkbox: [
      { id: 0, nombre: "Administrador", activo: false },
      { id: 1, nombre: "Médico", activo: false },
      { id: 2, nombre: "Médico con acesso a todas las recetas", activo: false },
      { id: 3, nombre: "Mostrador de farmacia", activo: false },
      { id: 4, nombre: "Responsable sanitario", activo: false },
    ],
    medico: [
      {
        id: 0,
        nombre: "med_nombre",
        etiqueta: "Nombre:",
        classeAñadida: "m-0"
      },
      {
        id: 1,
        nombre: "med_especialidad",
        etiqueta: "Especialidad:",
        classeAñadida: "m-0",
      },
      {
        id: 2,
        nombre: "med_cedula",
        etiqueta: "Dedula:",
        classeAñadida: "m-0",
      },
      {
        id: 3,
        nombre: "med_universidad",
        etiqueta: "Universidad:",
        classeAñadida: "m-0 col-sm-6 col-12 d-inline-block",
      },
      {
        id: 4,
        nombre: "med_turno",
        etiqueta: "Turno:",
        classeAñadida: "m-0 col-sm-6 col-12 d-inline-block",
      },
    ],
  };

  state = {
    medico: false,
  };

  async componentDidMount() {
    let state = this.props.location.state;
    console.log(state)
    if (state === undefined || state?.id === undefined)
      this.props.history.push("/");
    else if (state.id !== -1) {
      let api = new API_Service();
      await api.start({ username: "carrot", password: "1234" });
      console.log(await api.getUserById(state.id));
    }
  }

  checkBoxes = (event) => {
    let { checkbox } = this.inputs;
    checkbox[event.target.id].activo = !checkbox[event.target.id].activo;
    let medico = false;
    checkbox.map((item) => {
      if (
        (event.target.checked &&
          checkbox[event.target.id].nombre.includes("Médico")) ||
        (item.activo && item.nombre.includes("Médico"))
      ) {
        medico = true;
      } else {
      }
    });
    this.setState({
      medico: medico,
    });
  };

  submit = (values) => {
    this.props.history.push(`${this.usersUrl}`);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <form>
            <div className="row m-0">
              <div className="item-container col p-4 mb-2 d-inline-block">
                <p className="t-blue-l">Agregar/Modificar usuario</p>
                <input hidden />
                {this.inputs.data.map((item) => (
                  <React.Fragment key={item.id}>
                    <CustomInput
                      classAdd={item.classeAñadida}
                      name={item.nombre}
                      label={item.etiqueta}
                      placeholder=" "
                      type={item?.tipo}
                      req={item?.req}
                    />
                  </React.Fragment>
                ))}

                <div className="col ml-2 l-text pb-2 pt-2">
                  {this.inputs.checkbox.map((item) => (
                    <label
                      key={item.id}
                      className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm"
                    >
                      <input
                        type="checkbox"
                        className="m-1"
                        id={item.id}
                        onChange={this.checkBoxes}
                      />
                      {item.nombre}
                    </label>
                  ))}
                </div>
              </div>

              {this.state.medico === true ? (
                <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
                  <p className="t-blue-l">Datos del médico</p>
                  {this.inputs.medico.map((item) => (
                    <React.Fragment key={item.id}>
                      <CustomInput
                        classAdd={item.classeAñadida}
                        name={item.nombre}
                        label={item.etiqueta}
                        placeholder=" "
                        type={item?.tipo}
                        req={item?.req}
                      />
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="item-container">
              <div className="d-flex flex-row-reverse pl-4 pr-4">
                <button
                  type="submit"
                  className="prl-1 ml-2 mt-4 mb-3 col-lg-auto l-text c-btn"
                >
                  Guardar
                </button>
                <Link
                  className="c-btn text-center col-lg-auto mt-4 mb-3"
                  to={{
                    pathname: `${this.usersUrl}`,
                  }}
                >
                  <p className="l-text m-0 p-0">Cancelar</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditUser;
