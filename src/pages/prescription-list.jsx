import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import CustomInput from "../components/utilities/custom-inputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
//Redux
import { connect } from "react-redux";
import {
  getPrescriptionList,
  getPrescriptionsByDoctorId,
} from "../redux/actions/prescription-actions";

class PrescriptionList extends Component {
  f_data_size = 0;
  recetaUrl = "recetas/";

  constructor(props) {
    super(props);
    this.state = {
      table: {
        headers: [
          { key: "folio", name: "Folio", sort: true },
          { key: "fecha", name: "Fecha", sort: true },
          { key: "medico.nombre", name: "Médico", sort: true },
          { key: "paciente.nombre", name: "Paciente", sort: true },
          { key: "", name: "Acciones", sort: false },
        ],
        rows: 5,
        rowsConfig: [5, 25, 50],
        page: 0,
        order: null,
        orderBy: null,
      },
      filter: "",
    };
  }

  fetchData() {
    let {
      profile,
      prescriptions,
      getPrescriptionList,
      getPrescriptionsByDoctorId,
    } = this.props;
    if (profile.usuario !== undefined && prescriptions.length === undefined) {
      if (profile.cargo.includes("Doctor Jefe")) getPrescriptionList();
      else getPrescriptionsByDoctorId();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  isoToLString(data) {
    let date = new Date(data);
    let day = date.getDate();
    let month = date.getUTCMonth();
    let year = date.getFullYear();
    return `${day}/${month}/${year}  ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  }

  handleRequestSort = (data) => {
    let { order, orderBy } = this.state.table;

    if (orderBy !== null) {
      const v = order === "desc" ? -1 : 1;

      data.sort(function (a, b) {
        let aVal = orderBy.split(".").reduce(function (result, key) {
          return result[key];
        }, a);
        let bVal = orderBy.split(".").reduce(function (result, key) {
          return result[key];
        }, b);

        if (bVal < aVal) {
          return v * 1;
        } else if (bVal > aVal) {
          return v * -1;
        }
        return 0;
      });
    }
    return data;
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      table: { ...this.state.table, page: newPage },
    });
  };

  handleChangeRowsPerPage = (event) => {
    let page = this.state.table.page;
    if (this.props.prescriptions.length < event.target.value) page = 0;
    this.setState({
      table: { ...this.state.table, page: page, rows: event.target.value },
    });
  };

  filter = () => {
    let { prescriptions } = this.props;
    let data = prescriptions.length > 0 ? [...prescriptions] : [];
    let value = this.state.filter;
    if (value !== "")
      data = data.filter(
        (item) =>
          (item.folio + "").includes(value) ||
          this.isoToLString(item.fecha).includes(value) ||
          item.medico.nombre.includes(value) ||
          item.paciente.nombre.includes(value)
      );
    this.f_data_size = data.length;
    return data;
  };

  onFilterActive = (value) => {
    this.setState({
      ...this.state,
      filter: value,
    });
  };

  buscar = {
    id: 0,
    name: "buscar",
    label: "Buscar:",
    required: false,
    handleChange: this.onFilterActive,
  };

  handleEmptyTable() {
    let { prescriptions } = this.props;
    let data = prescriptions.length !== undefined ? [...prescriptions] : [];
    return this.f_data_size < 1 ? (
      <div className="col-12 bg-blue-a">
        <p className="p-2 l-text text-center">
          {data.length < 1
            ? "Cargando..."
            : "No hay datos que coincidan con la búsqueda"}
        </p>
      </div>
    ) : null;
  }

  render() {
    let { table } = this.state;
    let { medico } = this.props.profile;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          {medico !== undefined ? (
            <div className="item-container p-3 mb-3">
              <div className="row col-12">
                <div className="col-12 col-sm-6 col-lg-3">
                  <p className="t-blue-l p-1 m-0 "> Nombre: </p>{" "}
                  <p className="p-1 m-0 "> {medico.nombre} </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <p className="t-blue-l p-1 m-0 "> Universidad: </p>{" "}
                  <p className="p-1 m-0 "> {medico.universidad} </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <p className="t-blue-l p-1 m-0 "> Especialidad: </p>{" "}
                  <p className="p-1 m-0 "> {medico.especialidad} </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <p className="t-blue-l p-1 m-0 "> Cedula: </p>{" "}
                  <p className="p-1 m-0 "> {medico.cedula} </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="item-container p-4">
            <p className="t-blue-l"> Listado de recetas </p>
            <TableContainer>
              <div className="col-12 bg-blue-a pt-3 pl-4 pr-4 mb-2">
                <CustomInput objeto={this.buscar} />
              </div>

              <Table>
                <TableHead>
                  <TableRow>
                    {table.headers.map((item) => (
                      <TableCell key={item.name} className="table-data">
                        <p
                          className="m-0 p-0 d-inline cursor-pointer"
                          onClick={() => {
                            if (item.sort) {
                              this.setState({
                                table: {
                                  ...this.state.table,
                                  orderBy: item.key,
                                  order:
                                    table.order !== null
                                      ? table.order === "asc"
                                        ? "desc"
                                        : "asc"
                                      : "asc",
                                },
                              });
                            }
                          }}
                        >
                          {item.name}
                        </p>
                        <div className="d-inline m-2 arrow-sort cursor-pointer">
                          {table.orderBy !== null &&
                          table.orderBy === item.key ? (
                            table.order === "desc" ? (
                              <ArrowDownwardIcon
                                fontSize="small"
                                onClick={() => {
                                  this.setState({
                                    table: {
                                      ...this.state.table,
                                      orderBy: null,
                                      order: null,
                                    },
                                  });
                                }}
                              />
                            ) : (
                              <ArrowUpwardIcon
                                fontSize="small"
                                onClick={() => {
                                  this.setState({
                                    table: {
                                      ...this.state.table,
                                      orderBy: null,
                                      order: null,
                                    },
                                  });
                                }}
                              />
                            )
                          ) : null}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.handleRequestSort(this.filter())
                    .slice(
                      table.page * table.rows,
                      table.page * table.rows + table.rows
                    )
                    .map((item) => (
                      <TableRow key={item?.id}>
                        <TableCell className="table-data">
                          {item?.folio}
                        </TableCell>
                        <TableCell className="table-data">
                          {this.isoToLString(item?.fecha)}
                        </TableCell>
                        <TableCell className="table-data">
                          {item?.medico.nombre}
                        </TableCell>
                        <TableCell className="table-data">
                          {item?.paciente.nombre}
                        </TableCell>
                        <TableCell>
                          <Link
                            className="btn btn-link"
                            to={{
                              pathname: `${this.recetaUrl}ver/${item.folio}`,
                              state: {
                                id: item.id,
                                accion: "ver",
                              },
                            }}
                          >
                            <VisibilityIcon />
                          </Link>
                          <Link
                            className="btn btn-link"
                            to={{
                              pathname: `${this.recetaUrl}editar/${item.folio}`,
                              state: {
                                id: item.id,
                                accion: "editar",
                              },
                            }}
                          >
                            <EditIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {this.handleEmptyTable()}

            <TablePagination
              rowsPerPageOptions={table.rowsConfig}
              labelRowsPerPage="Filas por página"
              component="div"
              count={this.f_data_size}
              rowsPerPage={table.rows}
              page={table.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

            <div className="d-flex flex-row-reverse">
              <Link
                className="c-btn text-center col-12 col-lg-3 mt-3"
                to={{
                  pathname: `${this.recetaUrl}agregar/nueva`,
                  state: {
                    id: -1,
                    accion: "editar",
                  },
                }}
              >
                <p className="l-text m-0 p-0">Generar nueva receta</p>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/*

 
                

*/

const mapDispatchActions = {
  getPrescriptionList,
  getPrescriptionsByDoctorId,
};

const mapStateToProps = (state) => ({
  prescriptions: state.prescriptions,
  profile: state.profile,
});

export default connect(mapStateToProps, mapDispatchActions)(PrescriptionList);
