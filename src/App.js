import React, { useEffect } from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
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

import { useSelector } from "react-redux";
import { ValidToken } from "./redux/actions/login-actions";

export const dM = () => {
  let darkMode = JSON.parse(localStorage.getItem("site-dark-mode"));
  if (darkMode === null) darkMode = false;

  !darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
    
  let json = JSON.stringify(!darkMode);
  localStorage.setItem("site-dark-mode", json);
};

export default function App() {
  const auth = useSelector((state) => state.auth).authenticated;

  useEffect(() => {
    dM();
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
          <Redirect to={"/inicio"} />
        </Route>
        {auth ? (
          <React.Fragment>
            <Route path="/inicio" exact component={Inicio}></Route>
            <Route path="/admin" exact component={Admin}></Route>
            <Route path="/admin/usuarios" exact component={UserList}></Route>
            <Route
              exact
              path="/admin/usuarios/:accion/:user"
              component={EditUser}
            ></Route>
            <Route path="/pacientes" exact component={PatientList}></Route>
            <Route
              exact
              path="/pacientes/:accion/:paciente"
              component={EditPatient}
            ></Route>
            <Route
              path="/medico/recetas"
              exact
              component={PrescriptionList}
            ></Route>
            <Route
              exact
              path="/medico/recetas/:accion/:folio"
              component={EditPrescription}
            ></Route>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {window.location.pathname !== "/logIn" ? (
              <div className="page-container"></div>
            ) : null}
          </React.Fragment>
        )}
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
