import React, { Component } from "react";

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-container p-3">
          <div
            className="card col-6"
            onClick={() => {
              this.props.history.push("admin/usuarios");
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          <div className="card col-6">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
