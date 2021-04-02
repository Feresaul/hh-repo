import React from "react";
import CustomInput from "./utilities/custom-inputs";
import CustomMultiSelect from "./utilities/custom-multi-select";
import { useForm } from "react-hook-form";

export default function PatientForm({ patient, submitForm, goBack }) {
  const { register, handleSubmit, errors } = useForm();
  const inputs = [
    {
      id: 0,
      name: "nombre",
      label: "Nombre Completo:",
      classAdd: "m-0 col-12",
      validation: { required: { value: true, message: "Campo requerido" } },
    },
    {
      id: 1,
      name: "curp",
      label: "CURP:",
      classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      validation: {
        required: { value: true, message: "Campo requerido" },
        minLength: { value: 18, message: "Debe tener 18 caracteres" },
      },
      maxLength: 18,
    },
    {
      id: 2,
      name: "edad",
      label: "Edad:",
      classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      validation: {
        required: { value: true, message: "Campo requerido" },
        min: { value: 0, message: "El valor mínimo es 0" },
        max: { value: 120, message: "El valor máximo es 120"}
      },
      type: "number",
      min: "0",
      max: "120",
    },
    {
      id: 3,
      name: "sexo",
      label: "Sexo:",
      classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      validation: { required: { value: true, message: "Campo requerido" } },
      options: ["masculino", "femenino", "otro"],
    },
    {
      id: 4,
      name: "domicilio",
      label: "Domicilio:",
      classAdd: "m-0 col-12 col-sm-6 d-inline-block",
      validation: { required: { value: true, message: "Campo requerido" } },
    },
    {
      id: 5,
      name: "nota",
      label: "Nota médica:",
      classAdd: "m-0 mb-3 col-12",
      validation: { required: { value: true, message: "Campo requerido" } },
    },
  ];

  var data = {};
  inputs.forEach((element) => {
    data = {
      ...data,
      [element.name]: patient !== null ? patient[element.name] : null,
    };
  });

  const onSubmit = (values) => {
    submitForm(values);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="row m-0">
          <div className="item-container col p-4 mb-2 d-inline-block">
            <p className="t-blue-l">Agregar/Modificar paciente</p>

            {inputs.map((item) => (
              <React.Fragment key={item.id}>
                {item.id !== 3 ? (
                  <CustomInput
                    {...item}
                    id={item.name}
                    name={item.name}
                    label={item.label}
                    classAdd={item.classAdd}
                    register={register(item.validation)}
                    error={errors[item.name]}
                    defaultValue={data[item.name]}
                  />
                ) : (
                  <CustomMultiSelect
                    id={item.id}
                    name={item.name}
                    label={item.label}
                    button_label="Seleccionar"
                    type="text"
                    cClass={item.classAdd}
                    register={register(item.validation)}
                    error={errors[item.name]}
                    options={item.options}
                    defaultValue={data[item.name]}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
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
