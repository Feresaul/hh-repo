import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { whoAmI } from "../redux/actions/login-actions";
import { useRoles } from "../pages/inicio";
//material-ui
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import store from "../redux/store";

function dM() {
  let darkMode = JSON.parse(localStorage.getItem("site-dark-mode"));
  if (darkMode === null) darkMode = false;

  darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
}

export function GoBack(history, pathname) {
  let data = pathname.split("/");
  data.splice(0, 1);
  data.pop();
  let n_url = "";
  data.forEach((element) => {
    n_url += "/" + element;
  });
  if (n_url === "") n_url = "/inicio";
  history.replace(n_url);
}

function Header() {
  const inicioUrl = "/inicio";
  const history = useHistory();
  const auth = useSelector((state) => state.auth).authenticated;
  const profile = useSelector((state) => state.profile);
  const pathname = history.location.pathname;
  const [darkMode, setDark] = useState(
    JSON.parse(localStorage.getItem("site-dark-mode"))
  );
  const roles = useRoles();
  const goBack = GoBack;

  useEffect(() => {
    dM();
    if (profile.usuario === undefined && auth) {
      whoAmI();
      store.dispatch({
        type: "FETCH_PROFILE",
        payload: {
          usuario: "EsaulFR",
          cargo: ["Doctor", "Farmaci", "Administrador"],
        },
      });
    } else if (profile.cargo !== undefined) {
      const role = roles.filter((item) => item.url === pathname);
      if (pathname !== inicioUrl && role.length > 0) {
        if (profile.cargo.indexOf(role[0].name) === -1)
          history.replace("/inicio");
      }
    }
  });

  const dark = () => {
    let json = JSON.stringify(!darkMode);
    localStorage.setItem("site-dark-mode", json);
    setDark(!darkMode);
  };

  return (
    <nav className="navbar header p-3">
      {auth === true ? (
        <React.Fragment>
          <div className="col-8 p-0">
            <span title="Volver">
              {pathname !== inicioUrl && (
                <button
                  className="btn btn-link hover-grow"
                  onClick={() => goBack(history, pathname)}
                >
                  <ArrowBackIcon className="iconC" />
                </button>
              )}
            </span>

            <p className="m-auto t-lg d-inline-block">
              <span className="ml-2 mr-2">
                <AccountCircleIcon fontSize="large" className="iconC" />
              </span>
              {profile.usuario}
            </p>
          </div>
          <div className="col-4 p-0">
            <p className="m-auto text-right">
              <span title="Inicio">
                <Link className="btn btn-link" to={inicioUrl}>
                  <MenuIcon className="hover-grow iconC" />
                </Link>
              </span>
              <span title="Modo Color">
                <button onClick={() => dark()} className="btn">
                  {darkMode ? (
                    <NightsStayIcon className="hover-grow iconC" />
                  ) : (
                    <WbSunnyIcon className="hover-grow iconC" />
                  )}
                </button>
              </span>
            </p>
          </div>
        </React.Fragment>
      ) : (
        <div className="col-12 text-center">
          <p className="t-lg m-auto">Centenario Hospital Hidalgo</p>
        </div>
      )}
    </nav>
  );
}

export default withRouter(Header);
