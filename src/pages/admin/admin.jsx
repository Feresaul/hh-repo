import React from "react";
import { useHistory } from "react-router";

export default function Admin() {
  const adminUrl = "admin/";
  const history = useHistory();
  const data = [
    {
      name: "Usuarios",
      url: `${adminUrl}usuarios`,
      description: [
        "Listado de usuarios",
        "Alta/Baja usuarios",
        "Actualización de datos",
      ],
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      name: "Pacientes",
      url: `/pacientes`,
      description: [
        "Listado de pacientes",
        "Alta/Baja pacientes",
        "Actualización de datos",
      ],
      img:
        "https://i.pinimg.com/736x/16/d2/60/16d2603048039d2c71a195d5323aa212.jpg",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-container p-lg-3 p-md-4 p-1">
        <div className="row d-flex justify-content-center m-0 p-1 p-sm-2 p-lg-4">
          {data.map((item) => (
            <React.Fragment key={item.name}>
              <div className="col col-lg-4 col-sm-3 p-2 p-lg-3 d-inline-block c-card">
                <div
                  className="item-container hover-grow cursor-pointer"
                  onClick={() => {
                    history.push(item.url);
                  }}
                >
                  <h5 className="card-title text-center p-4 m-0">
                    {item.name}
                  </h5>
                  <img className="c-card-image m-0" src={item.img} alt="card" />
                  <div className="p-4">
                    <ul className="m-0">
                      {item.description.map((item) => (
                        <li key={item} className="p-0 m-0 t-primary">
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
