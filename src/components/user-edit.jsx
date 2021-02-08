import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { Input } from "@material-ui/core";

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

  componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined)
      this.props.history.push("/");
    else console.log(state.id);
  }

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

                <div className="c-input col-12">
                  <input required />
                  <label> Nombre Completo: </label>
                  <div className="c-input-line"></div>
                </div>

                <div>
                  <i className="fa fa-eye p-2"></i>
                  <i className="fa fa-eye-slash p-2"></i>
                </div>

                <div className="col ml-2 l-text pb-2 pt-2">
                  {this.checkbox.data.map((item) => (
                    <label
                      key={item.id}
                      className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm"
                    >
                      <input type="checkbox" className="m-1" /> {item.nombre}
                    </label>
                  ))}
                </div>
              </div>

              <div className="item-container col p-4 mr-3 mb-2 ml-3 ml-sm-0">
                <p className="t-blue-l">Datos del médico</p>
                <input placeholder="" required />
                <input placeholder="" required />
                <input placeholder="" required />
                <input placeholder="" required />
                <input placeholder="" required />
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
                <button className="prl-1 mt-4 mb-3 col-lg-auto l-text c-btn">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditUser;
