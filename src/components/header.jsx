import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { whoAmI } from "../redux/actions/login-actions";

class Header extends Component {
  inicioUrl = "/inicio";

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidUpdate() {
    let { profile, auth, whoAmI } = this.props;
    if (profile.usuario === undefined && auth) {
      whoAmI();
    }
  }

  render() {
    return (
      <nav className="navbar header">
        {this.props.auth === true ? (
          <React.Fragment>
            <div className="col-8 l-text p-0">
              <p className="m-auto t-lg">
                <span>
                  {window.location.pathname !== this.inicioUrl ? (
                    <button
                      className="btn btn-link hover-grow"
                      onClick={() => this.goBack()}
                    >
                      <ArrowBackIcon className="l-text" />
                    </button>
                  ) : null}
                </span>
                <span className="ml-2 mr-2">
                  <AccountCircleIcon fontSize="large" />
                </span>
                {this.props.profile.usuario}
              </p>
            </div>
            <div className="col-4 p-0">
              <p className="m-auto text-right">
                <span>
                  <Link className="btn btn-link" to="/inicio">
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
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  profile: state.profile,
});

const mapDispatchActions = {
  whoAmI,
};

export default connect(mapStateToProps, mapDispatchActions)(withRouter(Header));
