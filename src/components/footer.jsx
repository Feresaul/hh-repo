import React, { Component } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import BusinessIcon from "@material-ui/icons/Business";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer bg-black">
          <div className="col-10 d-inline-block mt-4">
            <ErrorOutlineIcon className="l-text mb-4 mr-2 d-inline-block"/>
            <p className="l-text d-inline-block col-9 t-sm">
              Desarrollado por: <br></br>
              <i className="l-text t-bold t-sm">
                Universidad Panamericana Campus Aguascalientes
              </i>
            </p>
          </div>
          <div className="d-inline-block col-2 text-right">
            <BusinessIcon className="l-text mb-3 mr-3" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
