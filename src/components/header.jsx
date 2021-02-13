import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

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
              <Link className="btn btn-link" to="/inicio">
                <MenuIcon className="l-text" />
              </Link>
            </span>
          </p>
        </div>
      </nav>
    );
  }
}

export default Header;
