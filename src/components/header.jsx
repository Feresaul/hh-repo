import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { whoAmI } from "../redux/actions/login-actions";
//material-ui
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Header() {
  const inicioUrl = "/inicio";
  const history = useHistory();
  const auth = useSelector((state) => state.auth).authenticated;
  const profile = useSelector((state) => state.profile);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (profile.usuario === undefined && auth) {
      whoAmI();
    }
  });

  return (
    <nav className="navbar header p-3">
      {auth === true ? (
        <React.Fragment>
          <div className="col-8 l-text p-0">
            <p className="m-auto t-lg">
              <span>
                {window.location.pathname !== inicioUrl ? (
                  <button
                    className="btn btn-link hover-grow"
                    onClick={() => goBack()}
                  >
                    <ArrowBackIcon className="l-text" />
                  </button>
                ) : null}
              </span>
              <span className="ml-2 mr-2">
                <AccountCircleIcon fontSize="large" />
              </span>
              {profile.usuario}
            </p>
          </div>
          <div className="col-4 p-0">
            <p className="m-auto text-right">
              <span>
                <Link className="btn btn-link" to={inicioUrl}>
                  <MenuIcon className="l-text hover-grow" />
                </Link>
              </span>
            </p>
          </div>
        </React.Fragment>
      ) : (
        <div className="col-12 text-center">
          <p className="t-lg l-text m-auto">Centenario Hospital Hidalgo</p>
        </div>
      )}
    </nav>
  );
}
