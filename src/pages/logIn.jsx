import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { userLogIn, validToken } from "../redux/actions/login-actions";

class LogIn extends Component {
  componentDidUpdate() {
    if (this.props.token !== undefined) {
      if (this.props.auth !== undefined && this.props.auth) {
        this.props.history.push("/inicio");
      }
    }
  }

  login() {
    this.props.userLogIn("quique", "1234");
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-3">
          <button onClick={() => this.login()}> ENTRA </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
  token: state.auth.token,
});

const mapDispatchActions = {
  userLogIn,
  validToken,
};

export default connect(mapStateToProps, mapDispatchActions)(LogIn);
