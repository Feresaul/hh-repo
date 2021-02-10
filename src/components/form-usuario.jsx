import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import CustomInput from "./utilities/custom-inputs";

const validate = (values) => {
  const error = {};
  if (!values.med_nombreCompleto) {
    error.med_nombreCompleto = "El campo nombre es requerido";
  }
  return error;
};

class FormUsuario extends Component {
  componente = ({ input, meta, objeto }) => (
    <CustomInput
      input={input}
      meta={meta}
      objeto={objeto}
    />
  );

  render() {
    let { inputs } = this.props;
    return (
      <React.Fragment>
        <form>
          {inputs.map((item) => (
            <React.Fragment key={item.id}>
              <Field
                name={item.name}
                objeto={item}
                component={this.componente}
              />
            </React.Fragment>
          ))}
        </form>
      </React.Fragment>
    );
  }
}

const FormUsuarioRedux = reduxForm({
  form: "formUsuario",
  validate,
  enableReinitialize: true,
})(FormUsuario);

export default connect(null, null)(FormUsuarioRedux);
