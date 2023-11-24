import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { AnyNsRecord } from "dns";
import { Button, Typography } from "@mui/material";
import { SensorIcon } from "../../assets/icons/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getSelectetSession } from "../../store/authStore/DevsGrStore";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function TableSession() {
  const { data } = useAppSelector(state => state.DevSessionReduces);
  const { firstLastSess, firstSess, lastSess } = useAppSelector(
    state => state.chartReducer
  );
  const dispatch = useAppDispatch();
  const rows = data;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SelectSession = (id: string, time: string, level_akb: string) => {
    var data_sensors: any[] = []; ////// отображаем сенсоры
    var qw: any[] = [];

    for (let key in data) {
      let sess_data = JSON.parse(data[key].sess_data);

      const uniqueChars = sess_data.s.reduce((o: any, i: any) => {
        if (!o.find((v: { depth: any }) => v.depth == i.depth)) {
          o.push(i);
        }
        return o;
      }, []);

      for (var i in uniqueChars.sort(
        (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
      )) {
        if (String(id) === String(data[key].id)) {
          data_sensors.push({
            depth: String(uniqueChars[i].depth),
            "град.": uniqueChars[i].data
          });
        }
      }
    }

    qw.push({
      depth: 0,
      "град.": ""
    });

    const mergeByProperty = (arrays: any[], property = "depth") => {
      const arr = arrays.flatMap(item => item); //делаем из всех массивов - один

      const obj = arr.reduce((acc, item) => {
        return {
          // делаем из массива - объект, чтобы повторения перезаписывались
          ...acc,
          [item[property]]: { ...acc[item[property]], ...item }
        };
      }, {});

      return Object.values(obj); //обратно преобразуем из объекта в массив
    };

    const result = mergeByProperty([data_sensors, qw, firstLastSess]);

    let selectedSess = data_sensors.sort(
      (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
    );

    let firstlastsess = result.sort(
      (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
    );

    dispatch(getSelectetSession(selectedSess, firstlastsess));
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bolder",
          color: "#3c4043",
          mt: "22px",
          mb: "24px"
        }}
      >
        Таблица сессий по периоду
      </Typography>
      <Box
        sx={{
          width: "100%",
          background: "#F3F6F9",
          p: "12px",
          borderRadius: "4px",
          border: "1px solid #E5EAF2"
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((i: any, j: any) => (
                <TableRow key={i.id}>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {i.time_dev}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {i.level_akb}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Установить
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <Button
                      sx={{ fontSize: "12px" }}
                      onClick={() => {
                        //this.setRowId(i.id, i.time_dev, i.level_akb);
                        SelectSession(i.id, i.time_dev, i.level_akb);
                      }}
                    >
                      {" "}
                      Выбрать{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1 }]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage="Строк в таблице"
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page"
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
