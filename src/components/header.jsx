import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { whoAmI } from "../redux/actions/login-actions";
import { dM } from "../App";
//material-ui
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import store from "../redux/store";

function Header() {
  const inicioUrl = "/inicio";
  const history = useHistory();
  const auth = useSelector((state) => state.auth).authenticated;
  const profile = useSelector((state) => state.profile);
  const pathname = history.location.pathname;
  const [darkMode, setDark] = useState(
    JSON.parse(localStorage.getItem("site-dark-mode"))
  );

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (profile.usuario === undefined && auth) {
      whoAmI();
      store.dispatch({
        type: "FETCH_PROFILE",
        payload: {
          usuario: "EsaulFR",
          cargo: ["Doctor", "Farmacia", "Administrador"],
        },
      });
    }
  });

  const dark = () => {
    dM();
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
                  onClick={() => goBack()}
                >
                  <ArrowBackIcon className="iconC" />
                </button>
              )}
            </span>
            <span className="ml-2 mr-2">
              <AccountCircleIcon fontSize="large" className="iconC" />
            </span>
            <p className="m-auto t-lg d-inline-block">{profile.usuario}</p>
          </div>
          <div className="col-4 p-0">
            <p className="m-auto text-right">
              <span title="Inicio">
                <Link className="btn btn-link" to={inicioUrl}>
                  <MenuIcon className="hover-grow iconC" />
                </Link>
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
