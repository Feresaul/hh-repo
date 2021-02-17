import React, { Component } from "react";
import UserFormRedux from "../../components/user-form";
//Redux
import { connect } from "react-redux";
import { getUserById } from "../../redux/actions/user-actions";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let state = this.props.location.state;
    if (state === undefined || state?.id === undefined) {
      this.props.history.goBack();
      return;
    } else if (state !== null && state.id !== -1) {
      this.props.getUserById(state.id);
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    this.goBack();
  };

  render() {
    let { id } = this.props.location.state;
    let { user } = this.props;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          {(user.medico !== undefined && id === user.medico.id) || id === -1 ? (
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
  user: state.user,
});

const mapDispatchActions = {
  getUserById,
};

export default connect(mapStateToProps, mapDispatchActions)(EditUser);
