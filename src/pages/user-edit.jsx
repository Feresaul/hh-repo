import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";
import FormUsuario from "../components/form-usuario";
import FormMedico from "../components/form-medico";

class EditUser extends Component {
  usersUrl = "/usuarios";

  inputs = {
    data: [
      {
        id: 0,
        name: "med_nombreCompleto",
        label: "Nombre Completo:",
        classAdd: "m-0",
      },
      {
        id: 1,
        name: "med_usuario",
        label: "Usuario:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      },
      {
        id: 2,
        name: "med_contraseña",
        label: "Contraseña:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
    ],
    checkbox: [
      { id: 0, name: "Administrador", active: false },
      { id: 1, name: "Médico", active: false },
      { id: 2, name: "Médico con acesso a todas las recetas", active: false },
      { id: 3, name: "Mostrador de farmacia", active: false },
      { id: 4, name: "Responsable sanitario", active: false },
    ],
    medico: [
      {
        id: 0,
        name: "med_especialidad",
        label: "Especialidad:",
        classAdd: "m-0",
      },
      {
        id: 1,
        name: "med_cedula",
        label: "Cedula:",
        classAdd: "m-0",
      },
      {
        id: 2,
        name: "med_universidad",
        label: "Universidad:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
      },
      {
        id: 3,
        name: "med_turno",
        label: "Turno:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
      },
      {
        id: 4,
        name: "med_direccion",
        label: "Dirección:",
        classAdd: "m-0",
      },
    ],
  };

  state = {
    medico: false,
  };

  async componentDidMount() {
    let state = this.props.location.state;
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
    checkbox[event.target.id].active = !checkbox[event.target.id].active;
    let medico = false;
    checkbox.map((item) => {
      if (
        (event.target.checked &&
          checkbox[event.target.id].name.includes("Médico")) ||
        (item.active && item.name.includes("Médico"))
      ) {
        medico = true;
        return "";
      } else {
        return "";
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
          <div className="row m-0">
            <div className="item-container col p-4 mb-2 d-inline-block">
              <p className="t-blue-l">Agregar/Modificar usuario</p>

              <FormUsuario inputs={this.inputs.data} />

              <div className="col ml-2 l-text pb-2 pt-2">
                {this.inputs.checkbox.map((item) => (
                  <label
                    key={item.id}
                    className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm no-selectable"
                  >
                    <input
                      type="checkbox"
                      className="m-1"
                      id={item.id}
                      onChange={this.checkBoxes}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>

            {this.state.medico === true ? (
              <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
                <p className="t-blue-l">Datos del médico</p>

                <FormMedico inputs={this.inputs.medico} />
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
        </div>
      </React.Fragment>
    );
  }
}

export default EditUser;
