import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_Service } from "../services/api-service";
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

export default class PrescriptionList extends Component {
  editUrl = "recetas/";
  state = {
    table: {
      headers: ["Folio", "Fecha", "Médico", "Paciente", "Acciones"],
      rows: 5,
      rowsConfig: [5, 25, 50],
      page: 0,
    },
    medico: {
      nombre: "Prueba Prueba Prueba",
      universidad: "Universidad",
      cedula: "DNIDE092342",
      especialidad: "Especialidad",
    },
    prescriptions: [],
  };

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    this.setState({ prescriptions: await api.getPrescriptionList() });
  }

  isoToLString(data) {
    let date = new Date(data);
    let day = date.getDate();
    let month = date.getUTCMonth();
    let year = date.getFullYear();
    return `${day}/${month}/${year}  ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      table: { ...this.state.table, page: newPage },
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      table: { ...this.state.table, rows: event.target.value },
    });
  };
  /*
  <div className="item-container p-3">
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
  */

  render() {
    let { prescriptions, table } = this.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <div className="item-container p-4">
            <p className="t-blue-l"> Listado de recetas </p>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {table?.headers.map((item) => (
                      <TableCell key={item} className="table-data-header">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(table.rows > 0
                    ? prescriptions.slice(
                        table.page * table.rows,
                        table.page * table.rows + table.rows
                      )
                    : []
                  ).map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell className="table-data">
                        {item?.folio}
                      </TableCell>
                      <TableCell className="table-data">
                        {this.isoToLString(item?.fecha)}
                      </TableCell>
                      <TableCell className="table-data">
                        {item?.medico}
                      </TableCell>
                      <TableCell className="table-data">
                        {item?.paciente}
                      </TableCell>
                      <TableCell>
                        <Link
                          className="btn btn-link"
                          to={{
                            pathname: `${this.editUrl}ver/${item.folio}`,
                            state: {
                              id: item.id,
                              readOnly: true,
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </Link>
                        <Link
                          className="btn btn-link"
                          to={{
                            pathname: `${this.editUrl}editar/${item.folio}`,
                            state: {
                              id: item.id,
                              readOnly: false,
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

              {prescriptions.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Cargando ...</p>
                </div>
              ) : null}

              {prescriptions.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Sin datos</p>
                </div>
              ) : null}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={table.rowsConfig}
              component="div"
              count={prescriptions.length}
              rowsPerPage={table.rows}
              page={table.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

            <div className="d-flex flex-row-reverse">
              <Link
                className="c-btn text-center col-12 col-lg-3 mt-3"
                to={{
                  pathname: `${this.editUrl}agregar/nueva`,
                  state: {
                    id: -1,
                    readOnly: false,
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
