import React from "react";
import "./custom-inputs.scss";

export default function CustomInput({
  register,
  error,
  cClass,
  label,
  ...inputProps
}) {
  let { name } = { ...inputProps };
  if (name === undefined) console.error("Missing name for custom-input");

  let cs = "c-input " + cClass;
  return (
    <React.Fragment>
      <div className={cs}>
        <div className={`m-0 p-0${!error && "pb-2"}`}>
          <input
            className={`c-input-input ${error && "error"}`}
            ref={register}
            placeholder={" "}
            {...inputProps}
          />
          <label htmlFor={name} className={`c-input-label`}>
            {label}
          </label>
          <div className={`c-input-line`}></div>
        </div>
        {error && (
          <p className="c-input-error text-danger t-sm text-right col-12 m-0 p-0 pr-3">
            {error.message}
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
