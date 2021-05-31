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
      <div className={cClass + " p-1 pl-2 pr-2"}>
        <div className="c-multi">
          <input
            className="c-multi-input"
            id={name}
            name={name}
            ref={register}
            readOnly
            value={values}
            hidden
          />
          <label
            onClick={() => {
              if (values.length < options.length) setShow(!show);
            }}
            className={`col p-0 m-0 label ${
              (values.length > 0 || show) && "active"
            }  ${error ? "error" : ""}`}
          >
            {label}
            {error && values.length < 1 && (
              <span className="pl-2">{error.message}</span>
            )}
            <span className="pl-2">
              {!show
                ? values.length < options.length && button_label
                : "Cerrar"}
            </span>
          </label>

          {values.length < 1 && (
            <div
              className={`line ${values.length > 0 && "active"} ${
                error && "error"
              }`}
            />
          )}

          <div className="row p-0 m-0 inner">
            {values.map((item) => (
              <div className="chip t-sm pl-3 pr-1 m-1 text-truncate" key={item}>
                {item}
                <button type="button" onClick={() => deleteValue(item)}>
                  X
                </button>
              </div>
            ))}
            {values.length > 0 && (
              <div
                className={`line ${values.length > 0 && "active"} ${
                  error && "error"
                }`}
              />
            )}
          </div>

          {show && values.length < options.length && (
            <div className="c-options mb-1">
              <button
                className="m-0 p-0 options-btn"
                autoFocus
                //onBlur={() => setShow(false)}
              >
                {options.map(
                  (item) =>
                    values.indexOf(item) === -1 && (
                      <div
                        className="c-option p-1 t-md text-truncate"
                        key={item}
                        onClick={() => addValue(item)}
                      >
                        <LabelImportantIcon className="p-1" fontSize="small" />
                        {item}
                      </div>
                    )
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
