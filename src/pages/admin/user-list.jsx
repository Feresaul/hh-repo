import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { API_Service } from "../../services/api-service";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import CustomInput from "../../components/utilities/custom-inputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

class UserList extends Component {
  editUrl = "usuarios/";

  constructor(props) {
    super(props);
    this.state = {
      table: {
        headers: [
          { name: "Usuario", sort: true },
          { name: "Nombre", sort: true },
          { name: "Cargo(s)", sort: false },
          { name: "Acciones", sort: false },
        ],
        rows: 5,
        rowsConfig: [5, 25, 50],
        page: 0,
        order: null,
        orderBy: null,
      },
      data: [],
      f_data: [],
      deleteRow: {
        active: false,
        id: null,
      },
    };
  }

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    let users = await api.getUserList();
    this.setState({ ...this.state, data: [...users], f_data: [...users] });
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
    if (value !== "") data = data.filter(
      (item) => item.usuario.includes(value) || item.nombre.includes(value)
    );

    this.setState({
      ...this.state,
      f_data: data
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
    return f_data < 1 ? (
      <div className="col-12 bg-blue-a">
        <p className="p-2 l-text text-center">
          {data.length < 1
            ? "Cargando..."
            : "No hay datos que coincidan con la búsqueda"}
        </p>
      </div>
    ) : null;
  }

  deleteRow(id, active) {
    if (active && id === null) this.onDelete(this.state.deleteRow.id);
    this.setState({
      deleteRow: {
        active: active,
        id: id !== null ? id : null,
      },
    });
  }

  onDelete(id) {
    console.log(id, "Borrado");
  }

  render() {
    let { f_data, table, deleteRow } = this.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <div className="p-4 item-container">
            <p className="t-blue-l">Listado de usuarios/médicos</p>
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
                      <React.Fragment key={item?.id}>
                        {deleteRow.active && deleteRow.id === item.id ? (
                          <TableRow className="col-12 delete-row">
                            <td className="col-12" colSpan="4">
                              <div className="col-6 m-auto d-inline-block">
                                <p className="t-md m-auto text-center">
                                  ¿Eliminar permanentemente?
                                </p>
                              </div>
                              <button
                                className="col-2 btn-delete-row p-2"
                                onClick={() => this.deleteRow(null, false)}
                              >
                                Cancelar
                              </button>
                              <button
                                className="col-2 btn-delete-row p-2"
                                autoFocus
                                onClick={() => this.deleteRow(null, true)}
                                onBlur={() => this.deleteRow(null, false)}
                              >
                                Aceptar
                              </button>
                            </td>
                          </TableRow>
                        ) : (
                          <TableRow className="row">
                            <TableCell className="table-data">
                              {item?.usuario}
                            </TableCell>
                            <TableCell className="table-data">
                              {item?.nombre}
                            </TableCell>
                            <TableCell className="table-data">
                              {item?.cargo.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </TableCell>
                            <TableCell>
                              <Link
                                className="btn btn-link"
                                to={{
                                  pathname: `${this.editUrl}editar/${item?.usuario}`,
                                  state: {
                                    id: item.id,
                                  },
                                }}
                              >
                                <EditIcon />
                              </Link>
                              <button
                                className="btn btn-link btn-delete"
                                onClick={() => this.deleteRow(item.id, true)}
                              >
                                <DeleteOutlineIcon />
                              </button>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
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
                  pathname: `${this.editUrl}agregar/nuevo`,
                  state: {
                    id: -1,
                  },
                }}
              >
                <p className="l-text m-0 p-0">Agregar nuevo usuario</p>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserList;
