import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

class Header extends Component {
  user = "Hospital-hh";
  render() {
    return (
      <nav className="navbar header">
        <div className="col-8 l-text p-0">
          <p className="m-auto t-lg">
            <span className="ml-2 mr-2">
              <AccountCircleIcon fontSize="large" />
            </span>
            {this.user}
          </p>
        </div>
        <div className="col-4 p-0">
          <p className="m-auto text-right">
            <span>
              <IconButton>
                <MenuIcon className="l-text" />
              </IconButton>
            </span>
          </p>
        </div>
      </nav>
    );
  }
}

export default Header;
