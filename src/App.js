import React, { Component } from "react";
import UserList from "./components/user-list";
import EditUser from "./components/user-edit";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, BrowserRouter } from "react-router-dom";
import "./assets/css/app-styles.scss";
import PrescriptionList from "./components/prescription-list";
import EditPrescription from "./components/prescription-edit";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <BrowserRouter>
          <Route path="/usuarios" exact component={UserList}></Route>
          <Route exact path="/usuarios/:accion/:user" component={EditUser}></Route>
          <Route path="/recetas" exact component={PrescriptionList}></Route>
          <Route exact path="/recetas/:accion/:folio" component={EditPrescription}></Route>
        </BrowserRouter>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
