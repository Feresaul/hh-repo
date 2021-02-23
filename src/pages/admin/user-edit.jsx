import React, { Component } from "react";
import UserFormRedux from "../../components/user-form";
import { withRouter } from "react-router-dom";
//Redux
import { connect } from "react-redux";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let state = this.props.location.state;
    let { users } = this.props;
    if (
      users.length === undefined ||
      state === undefined ||
      state?.id === undefined
    ) {
      this.props.history.goBack();
      return;
    } else if (state !== null && state.id !== -1) {
      let user = users.find((user) => user.medico.id === state.id);
      this.setState({
        user: user,
      });
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    //this.goBack();
  };

  render() {
    let { user } = this.state;
    let { users } = this.props;
    let { id } = this.props.location.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          {user !== undefined || (id === -1 && users.length !== undefined) ? (
            <UserFormRedux
              user={id === -1 ? null : user}
              submitForm={this.submitForm}
              goBack={this.goBack}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchActions = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchActions)(EditUser)
);
