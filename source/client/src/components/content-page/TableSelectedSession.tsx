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
import { TableHead, Typography } from "@mui/material";
import { SensorIcon } from "../../assets/icons/icons";
import { useAppSelector } from "../../hooks/redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

export default function TableSelectedSession() {
  const { firstLastSess, firstSess, lastSess, selectedSess } = useAppSelector(
    state => state.chartReducer
  );

  console.log(selectedSess, "selectedSess");
  console.log(firstSess, "selectedSess");
  console.log(selectedSess, "selectedSess");

  let rows = firstLastSess;

  let raznitca;
  let a: number[] = [];
  let data = [];

  if (firstLastSess) {
    for (var i in firstLastSess) {
      raznitca = firstLastSess[i].data_f - firstLastSess[i].data_s;
      a.push(raznitca);
    }

    if (a.length) {
      for (var key in a) {
        if (Math.abs(a[key]) >= 3) {
          data.push(
            <TableRow className="datarow" key={"_depth_key_" + a[key] + key}>
              <TableCell
                align="center"
                sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
              >
                {" "}
                <CloseIcon sx={{ fontSize: "small", color: "red" }} />
              </TableCell>
            </TableRow>
          );
        } else if (Math.abs(a[key]) < 3) {
          data.push(
            <TableRow className="datarow" key={"_depth_key_" + a[key] + key}>
              <TableCell
                align="center"
                sx={{ p: "4px", color: "#002757", fontWeight: "500" }}
              >
                {" "}
                <CheckIcon sx={{ fontSize: "small", color: "green" }} />
              </TableCell>
            </TableRow>
          );
        }
      }
    }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
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
        Выбранная сессия
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
            <TableHead>
              <TableRow>
                <TableCell>Глубина</TableCell>
                <TableCell align="center">Контрольная сессия</TableCell>
                <TableCell align="center">Последняя сессия</TableCell>
                <TableCell align="center">Выбранная сессия</TableCell>
              </TableRow>
            </TableHead>
            {firstLastSess.length > 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {firstLastSess.map((row: any, i: any) => (
                          <TableRow
                            className="datarow"
                            key={"data_qd" + row.depth + row}
                          >
                            <TableCell
                              align="left"
                              sx={{
                                p: "4px",
                                color: "#002757",
                                fontWeight: "500"
                              }}
                            >
                              {" "}
                              {"" + row.depth}{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>

                  <TableCell>
                    <Table>
                      <TableBody>
                        {firstSess.map((row: any, i: any) => (
                          <TableRow
                            className="datarow"
                            key={"data_qds" + row.data_f + i + row.data_f}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                p: "4px",
                                color: "#002757",
                                fontWeight: "500"
                              }}
                            >
                              {" "}
                              {"" + row.data_f}{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>

                  <TableCell>
                    <Table>
                      <TableBody>
                        {lastSess.map((row: any, i: any) => (
                          <TableRow
                            className="datarow"
                            key={"data_qdsadsd1212313" + row.data_s + i}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                p: "4px",
                                color: "#002757",
                                fontWeight: "500"
                              }}
                            >
                              {" "}
                              {"" + row.data_s}{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>

                  <TableCell>
                    <Table>
                      <TableBody>
                        {selectedSess.map((row: any, i: any) => (
                          <TableRow
                            className="datarow"
                            key={"data_qdsadsd1212313" + row.data_s + i}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                p: "4px",
                                color: "#002757",
                                fontWeight: "500"
                              }}
                            >
                              {" "}
                              {"" + row.data_th}{" "}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", p: "24px" }}>
                      <Typography sx={{ color: "#266BF1" }}>
                        {" "}
                        Нет сессий на устройстве{" "}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "Все", value: -1 }]}
                  colSpan={3}
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
