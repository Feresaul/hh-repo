import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { API_Service } from "../services/api-service";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Input from "@material-ui/core/Input";
import TablePagination from "@material-ui/core/TablePagination";

class UserList extends Component {
  state = {
    tableHeaders: ["Usuario", "Nombre", "Cargo", "Acciones"],
    users: [],
    rows: 5,
    page: 0,
  };

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    this.setState({ users: await api.getUserList() });
  }

  onDelete(id) {}

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rows: event.target.value });
    this.forceUpdate()
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-container p-2 p-md-4">
          <div className="p-4 item-container">
            <p className="t-blue-l">Listado de usuarios/médicos</p>
            <div className="col-12 bg-blue-a mb-2 p-2">
              <Input
                className="col-12"
                placeholder="Buscar"
                name="filter"
                onChange={null}
              />
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.state.tableHeaders.map((item) => (
                      <TableCell key={item} className="table-data-header">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell className="table-data">
                        {item?.username}
                      </TableCell>
                      <TableCell className="table-data">
                        {`${item?.first_name} ${item?.last_name}`}
                      </TableCell>
                      <TableCell className="table-data">
                        {item?.shift}
                      </TableCell>
                      <TableCell>
                        <Link
                          className="btn btn-link"
                          to={{
                            pathname: `editar/${item.username}`,
                            state: {
                              id: item.id,
                            },
                          }}
                        >
                          <EditIcon />
                        </Link>
                        <button
                          className="btn btn-link"
                          onClick={() => this.onDelete(item.id)}
                        >
                          <DeleteIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {this.state.users.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Cargando ...</p>
                </div>
              ) : null}

              {this.state.users.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Sin datos</p>
                </div>
              ) : null}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.users.length}
              rowsPerPage={this.state.rows}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

            <div className="d-flex flex-row-reverse">
              <Link
                className="c-btn text-center col-12 col-lg-3 mt-3"
                to={{
                  pathname: `/editar/nuevo`,
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
