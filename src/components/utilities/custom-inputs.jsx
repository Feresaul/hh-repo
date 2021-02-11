import React, { Component } from "react";

export default class CustomInput extends Component {
  state = {};

  focus() {
    if (this.state.required)
      this.setState({
        ...this.state,
        placeholder: "",
      });
    else
      this.setState({
        ...this.state,
        placeholder: " ",
      });
  }

  componentDidMount() {
    let {
      name,
      label,
      type,
      classAdd,
      readOnly,
      required,
      handleChange,
    } = this.props.objeto;
    this.setState({
      name: name,
      placeholder: " ",
      label: label !== undefined ? label : "",
      type: type !== undefined ? type : "text",
      required: required !== undefined ? required : true,
      classAdd: classAdd,
      readOnly: readOnly !== undefined ? readOnly : false,
      handleChange: handleChange !== undefined ? handleChange : null,
    });
  }

  handleChange = (event) => {
    this.state.handleChange(event.target.value);
  };

  render() {
    let {
      name,
      label,
      type,
      required,
      classAdd,
      readOnly,
      placeholder,
      handleChange
    } = this.state;
    let cs = "c-input p-2 pt-1 " + classAdd;
    let { input, meta } = this.props;
    return (
      <React.Fragment>
        <div className={cs}>
          <div className="col-12 p-3">
            {handleChange !== null ? (
              <input
                {...(input !== undefined ? input : null)}
                className="c-input-input"
                placeholder={placeholder}
                type={type}
                id={name}
                name={name}
                required={required}
                onFocus={() => this.focus()}
                disabled={readOnly}
                onChange={this.handleChange}
              />
            ) : (
              <input
                {...(input !== undefined ? input : null)}
                className="c-input-input"
                placeholder={placeholder}
                type={type}
                id={name}
                name={name}
                required={required}
                onFocus={() => this.focus()}
                disabled={readOnly}
              />
            )}
            <label htmlFor={name} className="c-input-label">
              {label}
            </label>
            <div className="c-input-line"></div>
          </div>
          {meta !== undefined
            ? meta.touched &&
              meta.error && (
                <p className="c-input-error text-danger t-sm text-right col-12 m-0 p-0">
                  {meta.error}
                </p>
              )
            : null}
        </div>
      </React.Fragment>
    );
  }
}
