import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import CustomInput from "../../components/utilities/custom-inputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withRouter } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUserList } from "../../redux/actions/user-actions";

class PatientList extends Component {
  f_data_size = 0;
  editUrl = "pacientes/";

  constructor(props) {
    super(props);
    this.state = {
      table: {
        headers: [
          { key: "nombre", name: "Nombre", sort: true },
          { key: "curp", name: "CURP", sort: true },
          { key: "edad", name: "Edad", sort: true },
          { key: "sexo", name: "Sexo", sort: true },
          { key: "domicilio", name: "Domicilio", sort: true },
          { key: "", name: "Acciones", sort: false },
        ],
        rows: 5,
        rowsConfig: [5, 25, 50],
        page: 0,
        order: null,
        orderBy: null,
      },
      filter: "",
      deleteRow: {
        active: false,
        id: null,
      },
    };
  }

  componentDidMount() {
    if (this.props.users.length === undefined) this.props.getUserList();
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
    if (this.props.users.length < event.target.value) page = 0;
    this.setState({
      table: { ...this.state.table, page: page, rows: event.target.value },
    });
  };

  filter = () => {
    let { users } = this.props;
    let data = users.length !== undefined ? [...users] : [];
    let value = this.state.filter;
    if (value !== "")
      data = data.filter(
        (item) =>
          item.usuario.includes(value) || item.medico.nombre.includes(value)
      );
    this.f_data_size = data.length;
    return data;
  };

  onFilterActive = (event) => {
    let value = event.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      filter: value,
    });
  };

  buscar = {
    id: "buscar",
    name: "buscar",
    label: "Buscar:",
    required: false,
    handleChange: this.onFilterActive,
  };

  handleEmptyTable() {
    let { users } = this.props;
    let data = users.length !== undefined ? [...users] : [];
    return this.f_data_size < 1 ? (
      <div className="col-12 secondary-bg">
        <p className="p-2 text-center">
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
    let { table, deleteRow } = this.state;
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <div className="p-4 item-container">
            <p className="t-blue-l">Listado de pacientes</p>
            <TableContainer>
              <div className="col-12 secondary-bg pl-4 pr-4 pb-2 mb-2">
                <CustomInput {...this.buscar} />
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
                      <React.Fragment key={item?.usuario}>
                        {deleteRow.active && deleteRow.id === item.medico.id ? (
                          <TableRow className="col-12 delete-row">
                            <td className="col-12" colSpan="6">
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
                              {item.curp}
                            </TableCell>
                            <TableCell className="table-data">
                              {item.nombre}
                            </TableCell>
                            <TableCell className="table-data">
                              {item.edad}
                            </TableCell>
                            <TableCell className="table-data">
                              {item.sexo}
                            </TableCell>
                            <TableCell className="table-data">
                              {item.domicilio}
                            </TableCell>
                            <TableCell>
                              <Link
                                className="btn btn-link"
                                to={{
                                  pathname: `${this.editUrl}${item.id}`,
                                  state: {
                                    id: item.id,
                                  },
                                }}
                              >
                                <EditIcon />
                              </Link>
                              <button
                                className="btn btn-link btn-delete"
                                onClick={() =>
                                  this.deleteRow(item.id, true)
                                }
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
                  pathname: `${this.editUrl}nuevo`,
                  state: {
                    id: -1,
                  },
                }}
              >
                <p className="m-0 p-0">Agregar nuevo paciente</p>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchActions = {
  getUserList,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchActions)(PatientList)
);