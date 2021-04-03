import React, { useState } from "react";
import "./custom-multi-select.scss";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

export default function CustomMultiSelect({
  name,
  label,
  button_label,
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
    defaultValue !== null ? defaultValue : []
  );
  const [show, setShow] = useState(false);

  function deleteValue(element) {
    let c_values = values.filter((item) => item !== element);
    setValues(c_values);
    if (resFunction) resFunction(c_values);
  }

  function addValue(option) {
    let c_values = [...values];
    if (!multiselect) {
      c_values = [];
    }
    c_values.push(option);
    setValues(c_values);
    setShow(false);

    if (resFunction) resFunction(c_values);
  }

  return (
    <React.Fragment>
      <input
        id={name}
        name={name}
        ref={register}
        readOnly
        value={values}
        hidden
      />
      <div className={cClass}>
        <div className={`m-0 p-0${!error && "pb-2"}`}>
          <label
            onClick={() => {
              if (values.length < options.length) setShow(!show);
            }}
            className={`col p-0 m-0 mb-2 ${
              values.length > 0 ? "active-label mt-2" : "label mt-3"
            }  ${error && "error"}`}
          >
            {label}
            {error && values.length < 1 && (
              <span className="pl-2">{error.message}</span>
            )}
            <span className="p-2">
              {" "}
              {!show
                ? values.length < options.length && button_label
                : "Cerrar"}{" "}
            </span>
          </label>

          {show && values.length < options.length ? (
            <div className="c-options mb-2">
              {options.map(
                (item) =>
                  values.indexOf(item) === -1 && (
                    <div
                      className="c-option p-2 t-md text-truncate"
                      key={item}
                      onClick={() => addValue(item)}
                    >
                      <LabelImportantIcon className="p-1" fontSize="small" />{" "}
                      {item}
                    </div>
                  )
              )}
            </div>
          ) : (
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
          )}

          <div
            className={`${values.length > 0 ? "active-line" : "line"} ${
              error && "error"
            }`}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
