import React, { Component } from "react";
import { connect } from "react-redux";
import { FormSection, Field, reduxForm, change } from "redux-form";
import CustomInput from "./utilities/custom-inputs";

class UserForm extends Component {
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
    };
  }

  componentDidMount() {
    let { user } = this.props;

    if (user !== null) {
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

      let cargo = [""];

      cargo.forEach((item) => {
        item = "Médico";
        let name = "form_checkboxes." + item;
        data = {
          ...data,
          [name]: true,
        };
      });

      if (data !== null) {
        for (let item in data) {
          this.props.dispatch(change("userForm", item, data[item]));
        }

        let medico = false;
        this.inputs.checkbox.forEach((item) => {
          if (
            data["form_checkboxes." + item.name] === true &&
            item.name.includes("Médico")
          ) {
            item.active = true;
            medico = true;
          }
        });

        this.setState({
          medico: medico,
        });
      }
    }
  }

  checkBoxes = (event) => {
    let { checkbox } = this.inputs;
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
      medico: medico,
    });
    this.input.onChange(event);
  };

  submitForm = (values) => {
    this.props.submitForm(values);
  };

  componente = ({ input, meta, objeto }) => (
    <CustomInput input={input} meta={meta} objeto={objeto} />
  );

  input = {};
  checkcomponente = ({ input, objeto }) => {
    this.input = input;

    return (
      <label className="text-wrap m-2 ml-2 mr-4 p-0 col-sm-12 col-md-auto l-text t-sm no-selectable">
        <input
          {...input}
          id={objeto.id}
          type="checkbox"
          className="m-1"
          onChange={this.checkBoxes}
          checked={input.value}
        />
        {objeto.name}
      </label>
    );
  };

  render() {
    let { medico } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
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
                        name={item.name}
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

const UserFormRedux = reduxForm({
  form: "userForm",
  validate,
  enableReinitialize: true,
})(UserForm);

export default connect(null, null)(UserFormRedux);
