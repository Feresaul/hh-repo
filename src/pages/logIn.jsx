import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogIn } from "../redux/actions/login-actions";

export default function LogIn() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth).authenticated;
  const [hasError, setHasError] = useState(false); 

  useEffect(() => {
    if (auth !== undefined && auth) {
      history.push("/inicio");
    }
  });

  const login = async () => {
    let res = await userLogIn("quique", "1234");
    if (!auth && !res.hasError){
      setHasError(true);
    }
  };

  return (
    <React.Fragment>
      <div className="page-container p-3">
        <button onClick={() => login()}> ENTRA </button>
        { hasError && <p> Credenciales incorrectas </p> }
      </div>
    </React.Fragment>
  );
}
