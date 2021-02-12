import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { API_Service } from "../services/api-service";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import CustomInput from "../components/utilities/custom-inputs";

class UserList extends Component {
  editUrl = "/usuarios/";

  constructor(props) {
    super(props);
    this.state = {
      table: {
        headers: ["Usuario", "Nombre", "Cargo(s)", "Acciones"],
        rows: 5,
        rowsConfig: [5, 25, 50],
        page: 0,
        sortHeaders: ["usuario", "nombre", null, null],
        order: "asc",
        orderBy: "Nombre",
      },
      data: [],
      f_data: [],
      alert: {
        active: false,
        id: null,
      },
    };
    this.delete_row = React.createRef();
  }

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    let users = await api.getUserList();
    this.setState({ ...this.state, data: users, f_data: users });
  }

  //////////////////////////////////////////////////77

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  handleRequestSort = (event) => {
    let property = event.target.id;
    let { order, orderBy } = this.state.table;
    const isAsc = orderBy === property && order === "asc";
    this.setState({
      table: {
        ...this.state.table,
        orderBy: property,
        order: isAsc ? "desc" : "asc",
      },
    });
    console.log(this.state);
  };

  /////////////////////////////77

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

  filter = (value) => {
    let data = this.state.data;
    let f_data = [];
    if (value === "") f_data = data;
    else
      f_data = data.filter(
        (item) => item.usuario.includes(value) || item.nombre.includes(value)
      );

    this.setState({
      ...this.state,
      f_data: f_data,
    });
  };

  buscar = {
    id: 0,
    name: "buscar",
    label: "Buscar:",
    required: false,
    handleChange: this.filter,
  };

  handleEmptyTable() {
    let { data, f_data } = this.state;
    let message = "";
    if (data.length < 1) message = "Cargando...";
    else if (f_data < 1)
      message = " No hay datos que coincidan con la búsqueda";
    if (message !== "")
      return (
        <div className="col-12 bg-blue-a">
          <p className="p-2 l-text text-center">{message}</p>
        </div>
      );
    return null;
  }

  openAlert(id) {
    this.setState({
      alert: {
        active: true,
        id: id,
      },
    });
  }

  closeAlert(active) {
    if (active) this.onDelete(this.state.alert.id);
    this.setState({
      alert: {
        active: false,
        id: null,
      },
    });
  }

  onDelete(id) {
    console.log(id, "Borrado");
  }

  render() {
    let { f_data, table, alert } = this.state;
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
                    {table?.headers.map((item) => (
                      <TableCell
                        key={item}
                        sortDirection={
                          table.orderBy === item ? table.order : false
                        }
                      >
                        <TableSortLabel
                          id={item}
                          active={table.orderBy === item}
                          direction={
                            table.orderBy === item ? table.order : "asc"
                          }
                          onClick={this.handleRequestSort}
                        >
                          {item}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.stableSort(
                    f_data,
                    this.getComparator(table.order, table.orderBy)
                  )
                    .slice(
                      table.page * table.rows,
                      table.page * table.rows + table.rows
                    )
                    .map((item) => (
                      <React.Fragment key={item?.id}>
                        {alert.active && alert.id === item.id ? (
                          <TableRow className="col-12 delete-row">
                            <td
                              className="col-12 p-1"
                              colSpan="4"
                              ref={this.delete_row}
                              id={"delete_row." + item.id}
                            >
                              <div className="col-8 m-auto d-inline-block">
                                <p className="col-1 d-inline"></p>
                                <p className="col-11 m-auto ml-4 d-inline t-md">
                                  ¿Eliminar permanentemente?
                                </p>
                              </div>
                              <div className="col-4 pr-4 m-auto text-right d-inline-block">
                                <button
                                  className="btn btn-sm btn-outline-light m-2"
                                  onClick={() => this.closeAlert(false)}
                                >
                                  Cancelar
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-light m-2 mr-4"
                                  onClick={() => this.closeAlert(true)}
                                  autoFocus
                                  onBlur={() => this.closeAlert(false)}
                                >
                                  Aceptar
                                </button>
                              </div>
                            </td>
                          </TableRow>
                        ) : (
                          <TableRow>
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
                                onClick={() => this.openAlert(item.id)}
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
