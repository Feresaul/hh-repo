import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import PatientForm from "../../components/patient-form";

export default function EditPatient({path}) {
  const history = useHistory();
  const l_state = history.location.state;
  const id = l_state !== undefined ? l_state.id : null;
  const patients = useSelector((state) => state.users); // cambiar por pacientes
  const patient =
    id !== -1 && id !== null
      ? patients.find((patient) => patient.medico.id === id)
      : null;

  useEffect(() => {
    if (id === null) history.replace(path);
  });

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
        <PatientForm
          patient={patient}
          submitForm={submitForm}
          goBack={goBack}
        />
      </div>
    </React.Fragment>
  );
}
