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

  let cs = classAdd + " p-1 pr-2 pl-2";
  return (
    <React.Fragment>
      <div className={cs}>
        <div className="c-input">
          <input
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
          <div className={`c-input-line`} />
        </div>
      </div>
    </React.Fragment>
  );
}
