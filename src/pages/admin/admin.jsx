import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

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
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      name: "Pacientes",
      url: `${this.adminUrl}pacientes`,
      description: [
        "Listado de pacientes",
        "Alta/Baja pacientes",
        "Actualización de datos",
      ],
      img:
        "https://i.pinimg.com/736x/16/d2/60/16d2603048039d2c71a195d5323aa212.jpg",
    },
  ];

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-lg-3 p-md-4 p-1">
          <div className="row d-flex justify-content-center m-0 p-1 p-sm-2 p-lg-4">
            {this.data.map((item) => (
              <React.Fragment key={item.name}>
                <div className="col col-lg-4 col-sm-3 p-2 p-lg-3 d-inline-block c-card">
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
                      src={item.img}
                      alt="card"
                    />
                    <div className="p-4">
                      <ul className="m-0">
                        {item.description.map((item) => (
                          <li key={item} className="p-0 m-0">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, null)(Admin);
