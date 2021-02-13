import React, { Component } from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import { Route, BrowserRouter } from "react-router-dom";
import "./assets/css/app-styles.scss";

import UserList from "./pages/admin/user-list";
import EditUser from "./pages/admin/user-edit";
import PrescriptionList from "./pages/prescription-list";
import EditPrescription from "./pages/prescription-edit";
import Admin from "./pages/admin/admin";
import Inicio from "./pages/inicio";
import LogIn from "./pages/logIn";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header></Header>
          <Route path="/logIn" exact component={LogIn}></Route>
          <Route path="/inicio" exact component={Inicio}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/admin/usuarios" exact component={UserList}></Route>
          <Route
            exact
            path="/admin/usuarios/:accion/:user"
            component={EditUser}
          ></Route>
          <Route path="/recetas" exact component={PrescriptionList}></Route>
          <Route
            exact
            path="/recetas/:accion/:folio"
            component={EditPrescription}
          ></Route>
          <Footer></Footer>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
