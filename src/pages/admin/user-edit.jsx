import React, { Component } from "react";
import { API_Service } from "../../services/api-service";

import { connect } from "react-redux";
import { FormSection, Field, reduxForm, change } from "redux-form";
import CustomInput from "../../components/utilities/custom-inputs";

class EditUser extends Component {
  usersUrl = "admin/usuarios";

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

  constructor(props) {
    super(props);
    this.state = {
      medico: false,
      user: null,
    };
  }

  delayState = () => {
    setTimeout(() => {
      console.log("hola kks");
    }, 2000);
  };

  async componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined)
      this.props.history.push(this.usersUrl);
    else if (state.id !== -1) {
      let api = new API_Service();
      await api.start({ username: "carrot", password: "1234" });
      let user = await api.getUserById(state.id);

      this.delayState()

      if (user.error !== undefined && user.error) {
        console.log(user.info);
        this.props.history.goBack();
        return;
      }

      let data = {
        "form_user.med_nombreCompleto": user.medico.nombre,
        "form_user.med_usuario": user.usuario,
        "form_doctor.med_especialidad": user.medico.especialidad,
        "form_doctor.med_cedula": user.medico.cedula,
        "form_doctor.med_universidad": user.medico.universidad,
        "form_doctor.med_turno": user.medico.turno,
        "form_doctor.med_direccion": user.medico.direccion,
      };

      user.cargo.forEach((item) => {
        let name = "form_checkboxes.2"; //+item;
        data = {
          ...data,
          [name]: true,
        };
      });

      let keys = Object.keys(data);

      keys.forEach((item) => {
        this.props.dispatch(change("formEditUser", item, data[item]));
      });

      this.setState({
        ...this.state,
        user: user,
      });
    } else {
      this.setState({
        ...this.state,
        user: -1,
      });
    }
  }

  kk() {
    console.log("kk");
  }

  checkBoxes = (event) => {
    console.log(event);
    //this.inputs.checkbox[objeto.id].active = !this.inputs.checkbox[objeto.id].active;
    /*let { checkbox } = this.inputs;
    checkbox[event.target.id].active = !checkbox[event.target.id].active;
    let medico = false;
    checkbox.forEach((item) => {
      if (
        (event.target.checked &&
          checkbox[event.target.id].name.includes("Médico")) ||
        (item.active && item.name.includes("Médico"))
      ) {
        medico = true;
      }
    });
    this.setState({
      ...this.state,
      medico: medico,
    });*/
  };

  submit = (values) => {
    this.props.history.goBack();
    console.log(values);
  };

  componente = ({ input, meta, objeto }) => (
    <CustomInput input={input} meta={meta} objeto={objeto} />
  );

  checkcomponente = ({ input, objeto }) => (
    <label className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm no-selectable">
      <input
        {...input}
        id={objeto.id}
        type="checkbox"
        className="m-1"
        onChange={() => input.onChange(this.checkBoxes)}
        checked={input.value}
      />
      {objeto.name}
    </label>
  );

  render() {
    let { medico } = this.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <form onSubmit={this.props.handleSubmit(this.submit)}>
            <div className="row m-0">
              <div className="item-container col p-4 mb-2 d-inline-block">
                <p className="t-blue-l">Agregar/Modificar usuario</p>

                <FormSection name="form_user">
                  {this.inputs.data.map((item) => (
                    <React.Fragment key={item.id}>
                      <Field
                        name={item.name}
                        objeto={item}
                        component={this.componente}
                      />
                    </React.Fragment>
                  ))}
                </FormSection>

                <div className="col ml-2 l-text pb-2 pt-2">
                  <FormSection name="form_checkboxes">
                    {this.inputs.checkbox.map((item) => (
                      <React.Fragment key={item.id}>
                        <Field
                          name={item.id + ""}
                          objeto={item}
                          component={this.checkcomponente}
                        />
                      </React.Fragment>
                    ))}
                  </FormSection>
                </div>
              </div>

              {medico === true ? (
                <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
                  <p className="t-blue-l">Datos del médico</p>

                  <FormSection name="form_doctor">
                    {this.inputs.medico.map((item) => (
                      <React.Fragment key={item.id}>
                        <Field
                          name={item.name}
                          objeto={item}
                          component={this.componente}
                        />
                      </React.Fragment>
                    ))}
                  </FormSection>
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
                <button
                  className="c-btn text-center col-lg-auto mt-4 mb-3"
                  onClick={() => this.props.history.goBack()}
                >
                  <p className="l-text m-0 p-0">Cancelar</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const error = {};
  return error;
};

const FormEditUserRedux = reduxForm({
  form: "formEditUser",
  validate,
  enableReinitialize: true,
})(EditUser);

export default connect(null, null)(FormEditUserRedux);
