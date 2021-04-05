import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function DrugList() {
  const drugs = useSelector((state) => state.drugs);
  const history = useHistory();

  return (
    <>
      <div className="page-container p-2 p-md-4">
        <div className="row m-0">
          <div className="item-container col p-4 mb-2 d-inline-block">
            <button
              className="c-btn text-center col-12 col-md-6 pr-4 pl-4 d-inline"
              onClick={() => history.replace("farmacia/nuevo", { id: -1 })}
            >
              Agregar nuevo
            </button>
            <button
              className="c-btn text-center col-12 col-md-6 pr-4 pl-4 d-inline"
              onClick={() => history.replace("farmacia/nuevo", { id: -1 })}
            >
              Agregar nuevo
            </button>
          </div>
          <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">

          </div>
        </div>

        <div className="item-container col p-4 mb-2">
          <p className="t-blue-l"> Lista de medicamentos </p>
          <div className="d-flex flex-row-reverse">
            <button
              className="c-btn text-center col-auto mt-4 pr-4 pl-4"
              onClick={() => history.replace("farmacia/nuevo", { id: -1 })}
            >
              Agregar nuevo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
