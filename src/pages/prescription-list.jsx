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
import CustomInput from "../components/utilities/custom-inputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default class PrescriptionList extends Component {
  editUrl = "recetas/";

  constructor(props) {
    super(props);
    this.state = {
      table: {
        headers: [
          { name: "Folio", sort: true },
          { name: "Fecha", sort: true },
          { name: "Médico", sort: true },
          { name: "Paciente", sort: true },
          { name: "Acciones", sort: false },
        ],
        rows: 5,
        rowsConfig: [5, 25, 50],
        page: 0,
        order: null,
        orderBy: null,
      },
      medico: {
        nombre: "Prueba Prueba Prueba",
        universidad: "Universidad",
        cedula: "DNIDE092342",
        especialidad: "Especialidad",
      },
      data: [],
      f_data: [],
    };
  }

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    let data = await api.getPrescriptionList();
    this.setState({ ...this.state, data: data, f_data: data });
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
      let property = orderBy
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      data.sort(function (a, b) {
        if (b[property] < a[property]) {
          return v * 1;
        } else if (b[property] > a[property]) {
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
    this.setState({
      table: { ...this.state.table, rows: event.target.value },
    });
  };

  filter = () => {
    return [...this.state.f_data];
  };

  onFilterActive = (value) => {
    let data = [...this.state.data];
    if (value !== "")
      data = data.filter(
        (item) =>
          (item.folio + "").includes(value) ||
          this.isoToLString(item.fecha).includes(value) ||
          item.medico.includes(value) ||
          item.paciente.includes(value)
      );

    this.setState({
      ...this.state,
      f_data: data,
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
    let { data, f_data } = this.state;
    let message = "";
    if (data.length < 1) message = "Cargando...";
    else if (f_data < 1) message = "No hay datos que coincidan con la búsqueda";
    if (message !== "")
      return (
        <div className="col-12 bg-blue-a">
          <p className="p-2 l-text text-center">{message}</p>
        </div>
      );
    return null;
  }

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
    let { f_data, table } = this.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
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
                                  orderBy: item.name,
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
                          table.orderBy === item.name ? (
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
            </TableContainer>

            {this.handleEmptyTable()}

            <TablePagination
              rowsPerPageOptions={table.rowsConfig}
              component="div"
              count={f_data.length}
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
