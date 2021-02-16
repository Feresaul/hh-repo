import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { userLogIn } from "../../redux/actions/login-actions";

class Admin extends Component {
  adminUrl = "admin/";
  data = [
    {
      name: "Usuarios",
      url: `${this.adminUrl}usuarios`,
      description: [
        "Listado de usuarios",
        "Alta/Baja usuarios",
        "Actualización de datos",
      ],
    },
    {
      name: "Pacientes",
      url: "recetas", //`${this.adminUrl}pacientes`,
      description: [
        "Listado de pacientes",
        "Alta/Baja pacientes",
        "Actualización de datos",
      ],
    },
  ];

  componentDidMount() {
    this.props.userLogIn("quique", "1234");
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-lg-3 p-1">
          <div className="col col-md-10 col-xl-8 m-auto">
            <div className="row p-0 m-0">
              {this.data.map((item) => (
                <React.Fragment key={item.name}>
                  <div className="col p-2 p-lg-4 m-auto">
                    <div
                    className="item-container hover-grow cursor-pointer"
                      onClick={() => {
                        this.props.history.push(item.url);
                      }}
                    >
                      <h5 className="card-title bg-container text-center p-4 m-0">
                        {item.name}
                      </h5>
                      <img
                        className="c-card-image m-0"
                        src="https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg"
                      />
                      <div className="bg-container p-4">
                        {item.description.map((item) => (
                          <li key={item} className="pt-0 pb-0 pr-4 pl-4">
                            {item}
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchActions = {
  userLogIn,
};

export default connect(null, mapDispatchActions)(Admin);

/*
{this.data.map((item) => (
  <React.Fragment key={item.name}>
    <div className="d-inline-block col col-lg-6 m-0 p-0 m-auto">
      <div
        className="item-container page-full cursor-pointer hover-grow c-card m-auto"
        onClick={() => {
          this.props.history.push(item.url);
        }}
      >
        <h5 className="card-title bg-container text-center p-4 m-0">
          {item.name}
        </h5>
        <img
          className="c-card-image m-0"
          src="https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg"
        />
        <div className="bg-container p-4">
          {item.description.map((item) => (
            <li key={item} className="pt-0 pb-0 pr-4 pl-4">
              {item}
            </li>
          ))}
        </div>
      </div>
    </div>
  </React.Fragment>
))}*/
