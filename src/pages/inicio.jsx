import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export function useRoles() {
  const roles = [
    {
      id: 0,
      name: "Doctor",
      title: "Médico",
      subtitle: "Recetas médicas",
      url: `/recetas`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 1,
      name: "Farmacia",
      title: "Farmacia",
      subtitle: "Control de farmacia",
      url: `/farmacia`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 2,
      name: "Responsable Sanitario",
      title: "Responsable Sanitario",
      subtitle: "Control de fármacos",
      url: `resp-sanitario`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 3,
      name: "Doctor",
      title: "Recepción médica",
      subtitle: "Alta de pacientes",
      url: `/pacientes`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
    {
      id: 4,
      name: "Administrador",
      title: "Administrador",
      subtitle: "Usuarios/Médicos",
      url: `/usuarios`,
      img: "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg",
    },
  ];
  return roles;
}

export default function Inicio() {
  const roles = useRoles();
  const profile = useSelector((state) => state.profile);
  const history = useHistory();

  return (
    <React.Fragment>
      <div className="page-container p-lg-3 p-md-4 p-1">
        <div className="row d-flex justify-content-center m-0 p-1 p-sm-2 p-lg-4">
          {profile.cargo !== undefined &&
            profile.cargo.map((cargo) =>
              roles.map(
                (item) =>
                  cargo.includes(item.name) && (
                    <React.Fragment key={item.id}>
                      <div className="col col-lg-4 col-sm-6 p-2 p-lg-3 d-inline-block c-card">
                        <div
                          className="item-container hover-grow cursor-pointer"
                          onClick={() => {
                            history.push(item.url);
                          }}
                        >
                          <h5 className="card-title bg-container text-center pt-4 m-0">
                            {item.title}
                          </h5>
                          <p className="p-2 m-0 text-center t-primary">
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
                  )
              )
            )}
        </div>
      </div>
    </React.Fragment>
  );
}
