import React, { Component } from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import { Route, BrowserRouter } from "react-router-dom";
import "./assets/css/app-styles.scss";

import UserList from "./pages/admin/user-list";
import EditUser from "./pages/admin/user-edit";
import PatientList from "./pages/admin/patient-list";
import EditPatient from "./pages/admin/patient-edit";
import PrescriptionList from "./pages/prescription-list";
import EditPrescription from "./pages/prescription-edit";
import Admin from "./pages/admin/admin";
import Inicio from "./pages/inicio";
import LogIn from "./pages/logIn";

import { connect } from "react-redux";
import { validToken } from "./redux/actions/login-actions";

class App extends Component {
  componentDidMount() {
    if (window.location.pathname !== "/logIn") {
      this.props.validToken();
      if (!this.props.auth) {
        window.location.href = "/logIn";
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header></Header>
          <Route path="/logIn" exact component={LogIn}></Route>
          <Route path="/" exact component={Inicio}></Route>
          <Route path="/inicio" exact component={Inicio}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/admin/usuarios" exact component={UserList}></Route>
          <Route
            exact
            path="/admin/usuarios/:accion/:user"
            component={EditUser}
          ></Route>
          <Route path="/admin/pacientes" exact component={PatientList}></Route>
          <Route
            exact
            path="/admin/pacientes/:accion/:paciente"
            component={EditPatient}
          ></Route>
          <Route path="/medico/recetas" exact component={PrescriptionList}></Route>
          <Route
            exact
            path="/medico/recetas/:accion/:folio"
            component={EditPrescription}
          ></Route>
          <Footer></Footer>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
});

const mapDispatchActions = {
  validToken,
};

export default connect(mapStateToProps, mapDispatchActions)(App);
