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
    tableHeaders= ["Usuario", "Nombre", "Cargo", "Acciones"];
    users= [];
    s_users= [];
    rows= 5;
    page= 0;

  async componentDidMount() {
    let api = new API_Service();
    await api.start({ username: "carrot", password: "1234" });
    this.users = await api.getUserList();
    this.s_users = this.users;
    this.updateList();
  }

  onDelete(id) {}

  filter = (event) => {
    let val = event.target.value;
    if (val === "") return;
    let username = this.users.filter((item) =>
      item.username.includes(val)
    );
    let name = this.users.filter((item) =>
      `${item.first_name} ${item.last_name}`.includes(val)
    );
    let charge = this.users.filter((item) => item.shift.includes(val));
    let newUsers = username.concat(name).concat(charge);
    this.s_users = newUsers;
    this.forceUpdate();
  };

  handleChangePage = (event, newPage) => {
    this.page = newPage;
    this.updateList()
  };

  handleChangeRowsPerPage = (event) => {
    this.rows = event.target.value;
    this.updateList();
  };

  updateList(){
    this.s_users = [];
    let index = this.page * this.rows;
    for (let i = index; i < index + this.rows; i++) {
      if (i < this.users.length)
        this.s_users.push(this.users[i]);
    }
    this.forceUpdate();
  }

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
                onChange={this.filter}
              />
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.tableHeaders.map((item) => (
                      <TableCell key={item} className="table-data-header">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.s_users.map((item) => (
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

              {this.users.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Cargando ...</p>
                </div>
              ) : null}

              {this.s_users.length < 1 ? (
                <div className="col-12 bg-blue-a">
                  <p className="p-2 l-text t-sm">Sin datos</p>
                </div>
              ) : null}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.users.length}
              rowsPerPage={this.rows}
              page={this.page}
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
