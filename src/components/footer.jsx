import React from "react";
//material-ui
import BusinessIcon from "@material-ui/icons/Business";
import IconButton from "@material-ui/core/IconButton";

export default function Footer() {
  return (
    <React.Fragment>
      <nav className="navbar footer p-3">
        <div className="col-10">
          <div className="row p-2 p-md-3">
            <div className="p-0 pl-2">
              <p className="p-0 m-0 t-sm"> Desarrollado por: </p>
              <i className="t-bold t-sm p-0 m-0">
                Universidad Panamericana Campus Aguascalientes
              </i>
            </div>
          </div>
        </div>
        <div className="col-2 p-0">
          <p className="m-auto text-right">
            <span>
              <IconButton>
                <BusinessIcon className="iconC" />
              </IconButton>
            </span>
          </p>
        </div>
      </nav>
    </React.Fragment>
  );
}
