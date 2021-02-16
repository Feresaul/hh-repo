import React, { Component } from "react";
import UserFormRedux from "../../components/user-form";
//Redux
import { connect } from "react-redux";
import { userLogIn } from "../../redux/actions/login-actions";
import { getUserById } from "../../redux/actions/user-actions";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  data = null;

  getData() {
    let data = null;
    if (this.props.user !== undefined) {
      let user = this.props.user;
      console.log(user)

      if (user.error !== undefined && user.error) {
        console.log(user.info);
        this.props.history.goBack();
        return;
      }

      data = {
        "form_user.med_nombreCompleto": user.medico.nombre,
        "form_user.med_usuario": user.usuario,
        "form_doctor.med_especialidad": user.medico.especialidad,
        "form_doctor.med_cedula": user.medico.cedula,
        "form_doctor.med_universidad": user.medico.universidad,
        "form_doctor.med_turno": user.medico.turno,
        "form_doctor.med_direccion": user.medico.direccion,
      };

      user.cargo.forEach((item) => {
        item = "Médico";
        let name = "form_checkboxes." + item;
        data = {
          ...data,
          [name]: true,
        };
      });

      this.data = data;
    }
  }

  componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined) {
      this.props.history.goBack();
      return;
    } else if (state !== null && state.id !== -1) {
      this.props.getUserById(state.id);
      //this.getData();
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    this.goBack();
  };

  render() {
    //let { data } = this.state;
    console.log(this.props.user)
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          {this.props.user !== undefined && this.data !== null ? (
            <UserFormRedux
              data={this.data}
              submitForm={this.submitForm}
              goBack={this.goBack}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchActions = {
  getUserById,
  userLogIn,
};

export default connect(mapStateToProps, mapDispatchActions)(EditUser);
