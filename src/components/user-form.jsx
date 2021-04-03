import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "./utilities/custom-inputs";
import CustomMultiSelect from "./utilities/custom-multi-select";

export default function UserForm({ user, submitForm, goBack }) {
  const inputs = {
    user: [
      {
        id: 0,
        name: "nombre",
        label: "Nombre Completo:",
        classAdd: "m-0 col-12",
      },
      {
        id: 1,
        name: "usuario",
        label: "Usuario:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      },
      {
        id: 2,
        name: "contrasenia",
        label: "Contraseña:",
        classAdd: "m-0 col-12 col-sm-6 d-inline-block",
        type: "password",
      },
      {
        id: 3,
        name: "turno",
        label: "Turno:",
        classAdd: "m-0 col-sm-6 col-12 d-inline-block",
      },
    ],
    medico: [
      {
        id: 4,
        name: "especialidad",
        label: "Especialidad:",
        classAdd: "m-0 col",
      },
      {
        id: 5,
        name: "cedula",
        label: "Cedula:",
        classAdd: "m-0 col",
      },
      {
        id: 6,
        name: "universidad",
        label: "Universidad:",
        classAdd: "m-0 col",
      },
      {
        id: 7,
        name: "direccion",
        label: "Dirección:",
        classAdd: "m-0 col mb-3",
      },
    ],
    cargo: {
      validation: { required: true },
      checkbox: [
        "Administrador",
        "Médico",
        "Médico con acesso a todas las recetas",
        "Mostrador de farmacia",
        "Responsable sanitario",
      ],
    },
  };
  const [medico, setMedico] = useState(
    user !== null ? (user.medico !== null ? true : false) : false
  );
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (values) => {
    submitForm(values);
  };

  const checkRoles = (values) => {
    setMedico(false);
    values.forEach((item) => {
      if (item.includes("Médico")) setMedico(true);
    });
  };

  let user_data = {};
  inputs.user.forEach((element) => {
    user_data = {
      ...user_data,
      [element.name]: user !== null ? user[element.name] : null,
    };
  });
  
  let medico_data = {};
  inputs.medico.forEach((element) => {
    medico_data = {
      ...medico_data,
      [element.name]:
        user !== null && user.medico !== (undefined || null)
          ? user.medico[element.name]
          : null,
    };
  });

  const requiredField = {
    required: { value: true, message: "Campo requerido" },
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row m-0">
          <div className="item-container col p-4 mb-2 d-inline-block">
            <p className="t-blue-l">Agregar/Modificar usuario</p>

            {inputs.user.map((item) => (
              <React.Fragment key={item.id}>
                <CustomInput
                  {...item}
                  id={item.name}
                  name={item.name}
                  label={item.label}
                  classAdd={item.classAdd}
                  register={register(requiredField)}
                  error={errors[item.name]}
                  defaultValue={user_data[item.name]}
                />
              </React.Fragment>
            ))}

            <CustomMultiSelect
              id="cargo"
              name="cargo"
              label="Cargo(s):"
              button_label="Agregar"
              type="text"
              cClass="col-12"
              register={register(requiredField)}
              error={errors.cargo}
              options={inputs.cargo.checkbox}
              resFunction={checkRoles}
              multiselect={true}
              defaultValue={user !== null ? user.cargo : null}
            />
          </div>

          {medico === true ? (
            <div className="item-container p-4 col-12 col-lg-6 mb-2 ml-0 ml-lg-2 d-inline-block">
              <p className="t-blue-l">Datos del médico</p>

              {inputs.medico.map((item) => (
                <React.Fragment key={item.id}>
                  <CustomInput
                    id={item.name}
                    {...item}
                    register={register(requiredField)}
                    error={errors[item.name]}
                    defaultValue={medico_data[item.name]}
                  />
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </div>

        <div className="item-container">
          <div className="d-flex flex-row-reverse pl-4 pr-4">
            <button
              type="submit"
              className="c-btn text-center col-lg-auto mt-4 mb-3 pr-4 pl-4 ml-2"
            >
              Guardar
            </button>
            <button
              type="button"
              className="c-btn text-center col-lg-auto mt-4 mb-3 pr-4 pl-4"
              onClick={() => goBack()}
            >
              <p className="l-text m-0 p-0">Cancelar</p>
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
