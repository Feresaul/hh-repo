import React, { Component } from "react";
//import { connect } from "react-redux";
//import { reduxForm, Field, change } from "redux-form";
import CustomInput from "./utilities/custom-inputs";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";

class EditUser extends Component {
  checkbox = {
    data: [
      { id: 0, nombre: "Administrador", activo: false },
      { id: 1, nombre: "Médico", activo: false },
      { id: 2, nombre: "Médico con acesso a todas las recetas", activo: false },
      { id: 3, nombre: "Mostrador de farmacia", activo: false },
      { id: 4, nombre: "Responsable sanitario", activo: false },
    ],
  };

  state = {
    medico: false,
  };

  async componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined)
      this.props.history.push("/");
    else if (state.id !== -1){
      let api = new API_Service();
      await api.start({ username: "carrot", password: "1234" });
      console.log(await api.getUserById(state.id));
    }
  }

  checkBoxes = (event) => {
    let medico = false;
    this.checkbox.data.map((item) => {
      if (
        event.target.checked &&
        this.checkbox.data[event.target.id].nombre.includes("Médico")
      ) {
        medico = true;
      }
    });
    this.setState({
      medico: medico,
    });
  };

  submit = (values) => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <form>
            <div className="row">
              <div className="item-container col p-4 ml-3 mr-3 mb-2">
                <p className="t-blue-l">Agregar/Modificar usuario</p>
                <input hidden />
                <div className="col-12">
                  <CustomInput
                    name="nombre"
                    label="Nombre Completo:"
                    placeholder=" "
                    value="popo"
                  />
                  <div className="col-12 col-lg-6 d-inline-block p-0">
                    <CustomInput
                      name="usuario"
                      label="Usuario:"
                      placeholder=" "
                    />
                  </div>
                  <div className="col-12 col-lg-6 d-inline-block p-0">
                    <CustomInput
                      name="pwd"
                      type="password"
                      label="Contraseña:"
                      placeholder=" "
                    />
                  </div>
                </div>

                <div className="col ml-2 l-text pb-2 pt-2">
                  {this.checkbox.data.map((item) => (
                    <label
                      key={item.id}
                      className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm"
                    >
                      <input
                        type="checkbox"
                        className="m-1"
                        id={item.id}
                        onChange={this.checkBoxes}
                      />{" "}
                      {item.nombre}
                    </label>
                  ))}
                </div>
              </div>

              {this.state.medico === true ? (
                <div className="item-container col p-4 mr-3 mb-2 ml-3 ml-sm-0">
                  <p className="t-blue-l">Datos del médico</p>
                  <div className="col-12">
                    <CustomInput
                      name="especialidad"
                      label="Especialidad:"
                      placeholder=" "
                    />
                    <CustomInput
                      name="cedula"
                      label="Cedula:"
                      placeholder=" "
                    />
                    <div className="col-6 d-inline-block p-0">
                      <CustomInput
                        name="universidad"
                        label="Universidad:"
                        placeholder=" "
                      />
                    </div>
                    <div className="col-6 d-inline-block p-0">
                      <CustomInput
                        name="direccion"
                        label="Dirección:"
                        placeholder=" "
                      />
                    </div>
                    <div className="col-6 d-inline-block p-0">
                      <CustomInput
                        name="turno"
                        label="Turno:"
                        placeholder=" "
                      />
                    </div>
                  </div>
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
                    pathname: `/`,
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
