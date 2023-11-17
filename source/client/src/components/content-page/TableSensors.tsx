import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SensorIcon } from "../../assets/icons/icons";
import { TablePagination } from "@mui/material";

function createData(
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { calories, fat, carbs, protein };
}

const rows = [
  createData(159, 6.0, 24, 4.0),
  createData(237, 9.0, 37, 4.3),
  createData(262, 16.0, 24, 6.0),
  createData(305, 3.7, 67, 4.3),
  createData(356, 16.0, 49, 3.9)
];

export default function TableSensors(sensors: any) {
  console.log(sensors.props, "sensors1");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "100px", height: "500px" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Список сенсоров на устройстве</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensors.props.map((row: any) => (
            <TableRow
              key={row.depth}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <SensorIcon />
              </TableCell>
              <TableCell align="right">{row.depth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={12}
        page={1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
