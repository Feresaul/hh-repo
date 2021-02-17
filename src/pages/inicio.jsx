import React, { Component } from "react";

class Inicio extends Component {
  inicioUrl = "/";
  data = [
    {
      id: 0,
      title: "Médico",
      subtitle: "Recetas médicas",
      url: `${this.inicioUrl}recetas`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 1,
      title: "Farmacia",
      url: `${this.inicioUrl}usuarios`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 2,
      title: "Responsable Sanitario",
      url: `${this.inicioUrl}usuarios`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 3,
      title: "Recepción médica",
      subtitle: "Alta de pacientes",
      url: `${this.inicioUrl}usuarios`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 4,
      title: "Administrador",
      url: `${this.inicioUrl}admin`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
  ];

  cargos = [];

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-lg-3 p-md-4 p-1">
          <div className="row d-flex justify-content-center m-0 p-3">
            {this.data.map((item) => (
              <React.Fragment key={item.id}>
                <div className="col col-lg-4 col-sm-6 p-2 p-sm-4 d-inline-block c-card">
                  <div
                    className="item-container hover-grow cursor-pointer"
                    onClick={() => {
                      this.props.history.push(item.url);
                    }}
                  >
                    <h5 className="card-title bg-container text-center pt-4 m-0">
                      {item.title}
                    </h5>
                    <p className="p-2 text-center">
                      {item.subtitle !== undefined ? item.subtitle : "."}
                    </p>
                    <img
                      className="c-card-image m-0"
                      src={item.img}
                      alt="card"
                    />
                    <p className="p-2 m-0"></p>
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

export default Inicio;
