import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import PatientForm from "../../components/patient-form";

export default function EditPatient() {
  const history = useHistory();
  const id = history.location.state.id;
  const patients = useSelector((state) => state.users); // cambiar por pacientes
  const patient =
    id !== -1 ? patients.find((patient) => patient.medico.id === id) : null;

  const goBack = () => {
    history.goBack();
  };

  const submitForm = (values) => {
    console.log(values);
    goBack();
  };

  return (
    <React.Fragment>
      <div className="page-container p-2 p-md-4">
        {(patient !== undefined || id === -1) && (
          <PatientForm
            patient={patient}
            submitForm={submitForm}
            goBack={goBack}
          />
        )}
      </div>
    </React.Fragment>
  );
}
