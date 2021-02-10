import React, { Component } from "react";

export default class CustomInput extends Component {
  state = {};

  focus() {
    if (this.state.req)
      this.setState({
        name: this.state.name,
        placeholder: "",
        label: this.state.label,
        type: this.state.type,
      });
    else
      this.setState({
        name: this.state.name,
        placeholder: " ",
        label: this.state.label,
        type: this.state.type,
      });
  }

  componentDidMount() {
    let { name, placeholder, label, type, value, classAdd, disabled } = this.props;
    let req = true;
    if (this.props.req !== undefined) req = this.props.req;
    this.setState({
      name: name,
      placeholder: placeholder,
      label: label,
      type: type,
      req: req,
      value: value,
      classAdd: classAdd,
      disabled: disabled
    });
    
  }

  render() {
    let { name, placeholder, label, type, req, classAdd, disabled } = this.state;
    let cs =  "c-input p-2 pt-1"+ classAdd;
    return (
      <React.Fragment>
        <div className={cs}>
          <div className="col-12 p-3">
            <input
              className="c-input-input"
              placeholder={placeholder}
              type={type !== undefined ? type : "text"}
              name={name}
              id={name}
              required={req}
              onFocus={() => this.focus()}
              disabled={disabled}
            />
            <label htmlFor={name} className="c-input-label"> {label} </label>
            <div className="c-input-line"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
