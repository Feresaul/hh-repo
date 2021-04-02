import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import UserForm from "../../components/user-form";

export default function EditUser() {
  const history = useHistory();
  const l_state = history.location.state;
  const id = l_state !== undefined ? l_state.id : -1;
  const users = useSelector((state) => state.users);
  const user = id !== -1 ? users.find((user) => user.medico.id === id) : null;

  const goBack = () => {
    history.goBack();
  };

  const submitForm = (values) => {
    console.log(values);
    //goBack();
  };

  return (
    <React.Fragment>
      <div className="page-container p-2 p-md-4">
        <UserForm
          user={user}
          /*{{
            usuario: "popo",
            contrasenia: "dewdew",
            turno: "M-3",
            nombre: "Ded",
            cargo: ["Médico", "Administrador"],
            medico: {especialidad: "popo", cedula: "DIB484362DOEW", universidad: "San HSAIHS", direccion: "ddscdsc"}
          }}*/
          submitForm={submitForm}
          goBack={goBack}
        />
      </div>
    </React.Fragment>
  );
}
