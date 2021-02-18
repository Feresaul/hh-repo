import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

class Inicio extends Component {
  inicioUrl = "/";
  data = [
    {
      id: 0,
      name: "raven",
      title: "Médico",
      subtitle: "Recetas médicas",
      url: `${this.inicioUrl}medico/recetas`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 1,
      name: "raven",
      title: "Farmacia",
      url: `${this.inicioUrl}farmacia`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 2,
      name: "raven",
      title: "Responsable Sanitario",
      url: `${this.inicioUrl}resp-sanitario`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 3,
      name: "raven",
      title: "Recepción médica",
      subtitle: "Alta de pacientes",
      url: `${this.inicioUrl}recepcion-medica`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 4,
      name: "raven",
      title: "Administrador",
      url: `${this.inicioUrl}admin`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
  ];

  render() {
    let { profile } = this.props;
    return (
      <React.Fragment>
        <div className="page-container p-lg-3 p-md-4 p-1">
          <div className="row d-flex justify-content-center m-0 p-1 p-sm-2 p-lg-4">
            {profile !== undefined
              ? this.data.map((item) =>
                  profile.cargo !== undefined //&& profile.cargo.includes(item.name) 
                  ? (
                    <React.Fragment key={item.id}>
                      <div className="col col-lg-4 col-sm-6 p-2 p-lg-3 d-inline-block c-card">
                        <div
                          className="item-container hover-grow cursor-pointer"
                          onClick={() => {
                            this.props.history.push(item.url);
                          }}
                        >
                          <h5 className="card-title bg-container text-center pt-4 m-0">
                            {item.title}
                          </h5>
                          <p className="p-2 m-0 text-center">
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
                  ) : null
                )
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchActions = {};

export default connect(mapStateToProps, mapDispatchActions)(Inicio);
