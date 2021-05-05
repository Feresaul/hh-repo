import React, { useState, useEffect } from "react";
import { useTable } from "../hooks/table";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getPatientList } from "../redux/actions/patient-actions";
//material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";
import CustomInput from "../components/utilities/custom-inputs";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default function PatientList() {
  const pacientesUrl = "pacientes/";
  const history = useHistory();
  const patients = useSelector((state) => state.users); // cambiar por patients
  let f_data = null;

  const tableData = {
    headers: [
      { key: "nombre", name: "Nombre", sort: true },
      { key: "curp", name: "CURP", sort: true },
      { key: "edad", name: "Edad", sort: true },
      { key: "sexo", name: "Sexo", sort: true },
      { key: "domicilio", name: "Domicilio", sort: true },
      { key: "", name: "Acciones", sort: false },
    ],
  };
  const table = useTable();
  const [filter, setFilter] = useState("");
  const [deleteActive, setDeleteActive] = useState({
    active: false,
    id: null,
  });

  useEffect(() => {
    if (patients.length === undefined) getPatientList();
  });

  const onFilter = () => {
    let data = patients.length !== undefined ? [...patients] : [];
    if (filter !== "")
      data = data.filter(
        (item) =>
          item.usuario.includes(filter) || item.medico.nombre.includes(filter) //cambiar
      );

    f_data = data;
    return data;
  };

  const onFilterActive = (event) => {
    setFilter(event.target.value);
  };

  const handleEmptyTable = () => {
    let data = patients.length !== undefined ? [...patients] : [];
    return f_data.length < 1 ? (
      <div className="col-12 secondary-bg">
        <p className="p-2 text-center">
          {data.length < 1
            ? "Cargando..."
            : "No hay datos que coincidan con la búsqueda"}
        </p>
      </div>
    ) : null;
  };

  const deleteRow = (id, active) => {
    if (active && id === null) onDelete(deleteActive.id);
    setDeleteActive({ active: active, id: id !== null ? id : null });
  };

  const onDelete = (id) => {
    console.log(id, "Borrado");
  };

  const buscar = {
    id: "buscar",
    name: "buscar",
    label: "Buscar:",
    handleChange: onFilterActive,
  };

  return (
    <React.Fragment>
      <div className="page-container p-2 p-md-4">
        <div className="p-4 item-container">
          <p className="t-blue-l">Listado de pacientes</p>
          <TableContainer>
            <div className="col-12 secondary-bg pl-4 pr-4 pb-2 mb-2">
              <CustomInput {...buscar} />
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  {tableData.headers.map((item) => (
                    <TableCell key={item.name} className="table-data">
                      <p
                        className="m-0 p-0 d-inline cursor-pointer"
                        onClick={() => {
                          if (item.sort) {
                            table.setOrderBy(item.key);
                            table.setOrder(
                              table.order !== null
                                ? table.order === "asc"
                                  ? "desc"
                                  : "asc"
                                : "asc"
                            );
                          }
                        }}
                      >
                        {item.name}
                      </p>
                      <div className="d-inline m-2 arrow-sort cursor-pointer">
                        {table.orderBy !== null &&
                          table.orderBy === item.key &&
                          (table.order === "desc" ? (
                            <ArrowDownwardIcon
                              fontSize="small"
                              onClick={() => {
                                table.setOrderBy(null);
                                table.setOrder(null);
                              }}
                            />
                          ) : (
                            <ArrowUpwardIcon
                              fontSize="small"
                              onClick={() => {
                                table.setOrderBy(null);
                                table.setOrder(null);
                              }}
                            />
                          ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table
                  .handleRequestSort(onFilter())
                  .slice(
                    table.page * table.rows,
                    table.page * table.rows + table.rows
                  )
                  .map((item) => (
                    <React.Fragment key={item?.usuario}>
                      {deleteActive.active &&
                      deleteActive.id === item.medico.id ? (
                        <TableRow className="col-12 delete-row">
                          <td className="col-12" colSpan="6">
                            <div className="col-6 m-auto d-inline-block">
                              <p className="t-md m-auto text-center">
                                ¿Eliminar permanentemente?
                              </p>
                            </div>
                            <button
                              className="col-2 btn-delete-row p-2"
                              onClick={() => deleteRow(null, false)}
                            >
                              Cancelar
                            </button>
                            <button
                              className="col-2 btn-delete-row p-2"
                              autoFocus
                              onClick={() => deleteRow(null, true)}
                              onBlur={() => deleteRow(null, false)}
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
                            <button
                              className="btn btn-link"
                              onClick={() =>
                                history.replace(pacientesUrl + "editar", {
                                  id: item.medico.id,
                                })
                              }
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn btn-link btn-delete"
                              onClick={() => deleteRow(item.id, true)}
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

          {handleEmptyTable()}

          <TablePagination
            rowsPerPageOptions={table.rowsConfig}
            labelRowsPerPage="Filas por página"
            component="div"
            count={f_data.length}
            rowsPerPage={table.rows}
            page={table.page}
            onChangePage={table.handleChangePage}
            onChangeRowsPerPage={(event) => {
              table.handleChangeRowsPerPage(event.target.value, f_data);
            }}
          />

          <div className="d-flex flex-row-reverse">
            <button
              className="c-btn col-12 col-lg-3 "
              onClick={() =>
                history.replace(pacientesUrl + "nuevo", { id: -1 })
              }
            >
              Agregar paciente
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
