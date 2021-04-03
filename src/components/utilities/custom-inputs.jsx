import React from "react";
import "./custom-inputs.scss";

export default function CustomInput({
  register,
  error,
  classAdd,
  label,
  handleChange,
  ...inputProps
}) {
  let { name } = { ...inputProps };
  if (name === undefined) console.error("Missing name for custom-input");

  let cs = "c-input " + classAdd;
  return (
    <React.Fragment>
      <div className={cs}>
        <div className={`m-0 p-0${!error && "pb-2"}`}>
          <input
            autoComplete="off"
            className={`c-input-input ${error && "error"}`}
            ref={register}
            placeholder={" "}
            {...inputProps}
            onChange={handleChange}
          />
          <label htmlFor={name} className={`c-input-label`}>
            {label}
            {error && <span className="pl-2">{error.message}</span>}
          </label>
          <div className={`c-input-line`}></div>
        </div>
      </div>
    </React.Fragment>
  );
}
