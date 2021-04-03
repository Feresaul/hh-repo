import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ValidToken } from "./redux/actions/login-actions";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import "./assets/css/app-styles.scss";

import Header from "./components/header";
import Footer from "./components/footer";
import UserList from "./pages/admin/user-list";
import EditUser from "./pages/admin/user-edit";
import PatientList from "./pages/admin/patient-list";
import EditPatient from "./pages/admin/patient-edit";
import PrescriptionList from "./pages/prescription-list";
import EditPrescription from "./pages/prescription-edit";
//import Admin from "./pages/admin/admin";
import Inicio from "./pages/inicio";
import LogIn from "./pages/logIn";


function RedirectHome(){
  useEffect(() => {
    window.location.href = "/inicio"
  })
  return <></>
}

export default function App() {
  const auth = useSelector((state) => state.auth).authenticated;

  useEffect(() => {
    if (auth === undefined) {
      ValidToken();
    } else if (!auth && window.location.pathname !== "/logIn") {
      window.location.href = "/logIn";
    }
  });

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Route path="/logIn" exact component={LogIn}></Route>
        <Route path="/" exact>
          <Redirect to="/inicio" />
        </Route>
        {auth && (
          <React.Fragment>
            <Switch>
              <Route path="/inicio" exact component={Inicio} />
              {/*<Route path="/admin" exact component={Admin}></Route>*/}
              <Route path="/usuarios" exact component={UserList} />
              <Route path="/usuarios/:user" exact>
                <EditUser path="/usuarios" />
              </Route>
              <Route path="/pacientes" exact component={PatientList} />
              <Route path="/pacientes/:paciente" exact>
                <EditPatient path="/pacientes" />
              </Route>
              <Route path="/recetas" exact component={PrescriptionList} />
              <Route
                exact
                path="/recetas/:folio"
                component={EditPrescription}
              ></Route>
              <Route path="*">
                <RedirectHome/>
              </Route>
            </Switch>
          </React.Fragment>
        )}
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
