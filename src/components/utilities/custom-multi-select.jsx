import React, { useState } from "react";
import "./custom-multi-select.scss";

export default function CustomMultiSelect({
  name,
  label,
  options,
  resFunction,
  register,
  error,
  cClass,
  multiselect,
  defaultValue,
}) {
  if (name === undefined) console.error("Missing name for multi-select");
  if (options === undefined) console.error("Missing options for multi-select");

  const [values, setValues] = useState(
    defaultValue !== undefined ? defaultValue : []
  );

  function deleteValue(element) {
    let c_values = values.filter((item) => item !== element);
    setValues(c_values);
    if (resFunction) resFunction(c_values);
  }

  function addValue(event) {
    let option = event.target.value;
    let c_values = [...values];
    event.target.value = "";

    if (!multiselect) {
      c_values = [];
    }
    c_values.push(option);
    setValues(c_values);

    if (resFunction) resFunction(c_values);
  }

  return (
    <React.Fragment>
      <input id={name} name={name} ref={register} readOnly value={values} hidden/>
      <div className={cClass}>
        <div className={`m-0 p-0${!error && "pb-2"}`}>
          <label
            className={`m-0 ${
              values.length > 0 ? "active-label mt-2" : "label mt-3"
            }  ${error && "error"}`}
          >
            {label}
            <span>
              <div className="d-inline label">
                <select onChange={addValue}>
                  <option defaultValue="selected" value="" />
                  {options.map(
                    (item) =>
                      values.indexOf(item) === -1 && (
                        <option key={item}>{item}</option>
                      )
                  )}
                </select>
              </div>
            </span>
          </label>
          <div className="p-0">
            {values.map((item) => (
              <div
                className="chip d-inline-block pl-3 pr-1 m-1 text-truncate"
                key={item}
              >
                {item}
                <button type="button" onClick={() => deleteValue(item)}>
                  X
                </button>
              </div>
            ))}
          </div>

          <div
            className={`${values.length > 0 ? "active-line" : "line"} ${
              error && "error"
            }`}
          />
        </div>
        {error && values.length < 1 && (
          <p className="text-danger t-sm text-right col-12 m-0 p-0 pr-3">
            {error.message}
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
