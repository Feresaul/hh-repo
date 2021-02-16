import React, { Component } from "react";
import PrescriptionFormRedux from "../components/prescription-form";
//Redux
import { connect } from "react-redux";
import { getPrescriptionById } from "../redux/actions/user-actions";

class EditPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { state } = this.props.location;
    if (state === undefined || state?.id === undefined) {
      this.props.history.goBack();
      return;
    } else if (state.id !== null && state.id !== -1) {
      //this.props.fetchRecetasInfo;
    }
  }

  /// al data le falta el folio y fecha, y los nombres de los campos se reciben como el objeto de Trello
  data = {
    p_curp: "blabla",
    p_nombre: "blabla",
    p_domicilio: "blabla",
    p_edad: 15,
    p_sexo: "blabla",

    med_nombre: "blabla",
    med_especialidad: "blabla",
    med_delula: 1238123,
    med_universidad: "blabla",
    med_turno: 5,

    m_nombre: "blabla",
    m_cantidad: 12,
    m_clave: 121233,
    m_dosificacion: 2,
    m_presentacion: "blabla",
    m_dias: 12,
    m_empaque: "super",
    m_via: "oral",
  };

  goBack = () => {
    this.props.history.goBack();
  };

  submitForm = (values) => {
    console.log(values);
    this.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <div className="item-container mb-2">
            <div className="col-12 d-flex flex-row-reverse pt-2">
              <p className="p-1 m-0 t-sm">{}</p>
              <p className="t-blue-l p-1 m-0">Folio:</p>
            </div>
            <div className="col-12 d-flex flex-row-reverse pb-2">
              <p className="p-1 m-0 t-sm">{}</p>
              <p className="t-blue-l p-1 m-0">Fecha/Hora:</p>
            </div>
          </div>
          <PrescriptionFormRedux
            data={this.data}
            info={this.props.location.state}
            goBack={this.goBack}
            submitForm={this.submitForm}
          />
        </div>
      </React.Fragment>
    );
  }
}

// ESTO ES CUANDO YA TENGA LA API BIEN
// const mapStateToProps = (state) => ({
//     recetasInfo = state.recetas
// });

// const mapDispatchActions = {
//     fetchRecetasInfo,
// }

// export default connect(mapStateToProps,mapDispatchActions)(CostumerIndvContainer);

export default EditPrescription;
