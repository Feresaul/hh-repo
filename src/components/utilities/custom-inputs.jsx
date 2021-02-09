import React, { Component } from "react";

export default class CustomInput extends Component {
  state = {};

  focus() {
    this.setState({
      name: this.state.name,
      placeholder: "",
      label: this.state.label,
      type: this.state.type,
    });
  }

  componentDidMount() {
    let { name, placeholder, label, type, value } = this.props;
    let req = true;
    if (this.props.req !== undefined) req = this.props.req;
    this.setState({
      name: name,
      placeholder: placeholder,
      label: label,
      type: type,
      req: req,
      value: value,
    });
  }

  render() {
    let { name, placeholder, label, type, req, value } = this.state;
    return (
      <React.Fragment>
        <div className="p-2 pt-1">
          <div className="c-input col-12 p-3 mt-1">
            <input
              className="c-input-input"
              placeholder={placeholder}
              type={type !== undefined ? type : "text"}
              name={name}
              id={name}
              required={req}
              onFocus={() => this.focus()}
            />
            <label className="c-input-label"> {label} </label>
            <div className="c-input-line"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
