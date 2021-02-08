import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

class Header extends Component {
  user = "Hospital-hh";
  render() {
    return (
      <React.Fragment>
        <div className="header bg-black">
          <div className="col-8 d-inline-block mt-4">
            <AccountCircleIcon className="l-text col-3 p-0 d-inline-block m-auto " fontSize="large"/>
            <p className="l-text d-inline-block col-9 t-md">{this.user}</p>
          </div>
          <div className="d-inline-block col-4 text-right">
            <IconButton>
              <MenuIcon className="l-text btn-custom" />
            </IconButton>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
