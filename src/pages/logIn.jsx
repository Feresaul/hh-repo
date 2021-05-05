import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogIn } from "../redux/actions/login-actions";

export default function LogIn() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const auth = useSelector((state) => state.auth).authenticated;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (auth !== undefined && auth) {
      history.push("/inicio");
    }
  });

  const login = async(values) => {
    let res = await userLogIn("quique", "1234")//values.username, values.pwd);
    if (!auth && !res.hasError) {
      setHasError(true);
    }
  };

  return (
    <React.Fragment>
      <div className="page-container p-3">
        <form onSubmit={handleSubmit(login)}>
          <input name="username" placeholder="username" ref={register} />
          <input name="pwd" type="password" placeholder="password" ref={register} />
          <button type="submit"> ENTRA </button>
        </form>

        {hasError && <p> Credenciales incorrectas </p>}
      </div>
    </React.Fragment>
  );
}
