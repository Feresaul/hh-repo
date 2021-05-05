import { useState } from "react";

export function useTable() {
  const rowsConfig = [1, 2, 3];
  const [rows, setRows] = useState(3);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value, data) => {
    if (data.length <= value) {
      setPage(0);
    }
    setRows(value);
  };

  const handleRequestSort = (data) => {
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

  return {
    rowsConfig: rowsConfig,
    rows: rows,
    page: page,
    setPage: setPage,
    order: order,
    setOrder: setOrder,
    orderBy: orderBy,
    setOrderBy: setOrderBy,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    handleRequestSort: handleRequestSort,
  };
}
