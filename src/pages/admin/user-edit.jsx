import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import UserForm from "../../components/user-form";

export default function EditUser({path}) {
  const history = useHistory();
  const l_state = history.location.state;
  const id = l_state !== undefined ? l_state.id : null;
  const users = useSelector((state) => state.users);
  const user =
    id !== -1 && id !== null
      ? users.find((user) => user.medico.id === id)
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
        <UserForm user={user} submitForm={submitForm} goBack={goBack} />
      </div>
    </React.Fragment>
  );
}
