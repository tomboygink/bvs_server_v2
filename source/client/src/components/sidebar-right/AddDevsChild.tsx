import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Loading from "../Loading";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { EditIcon, ExelIcon, SchemeIcon } from "../../assets/icons/icons";

export const AddDevsChild = () => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useAppSelector(state => state.devsReducer);

  return (
    <Box
      sx={{
        pt: "44px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mr: "14px"
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "12px", textAlign: "left", p: "2px" }}>
          Редактировать
        </Typography>

        <Typography
          sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
        >
          Переместить
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            mt: "12px",
            textAlign: "left",
            pl: "18px",
            borderLeft: "2px solid #318CE7",
            color: "#318CE7",
            fontWeight: "bold"
          }}
        >
          Поверочный интервал
        </Typography>
        <Typography
          sx={{ fontSize: "12px", mt: "12px", textAlign: "left", p: "2px" }}
        >
          Установить контрольную сессию
        </Typography>
      </Box>
      <Divider
        sx={{
          mt: "12px",
          mb: "62px",
          color: "#808080",
          width: "85%",
          borderColor: "#808080"
        }}
      />
      <Box
        sx={{
          p: "4px",
          border: "1px solid #0D80D8",
          borderRadius: "4px",
          background: "#F7FBFF",
          display: "flex",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <ExelIcon />
        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "left",
            p: "2px",
            color: "#0D80D8"
          }}
        >
          Сессии за период
        </Typography>{" "}
      </Box>

      <Box
        sx={{
          p: "4px",
          border: "1px solid #0D80D8",
          borderRadius: "4px",
          background: "#F7FBFF",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          mt: "15px"
        }}
      >
        <SchemeIcon />
        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "left",
            p: "2px",
            color: "#0D80D8"
          }}
        >
          Контроль критичности отклонений
        </Typography>{" "}
      </Box>

      <Box
        sx={{
          p: "4px",
          border: "1px solid #0D80D8",
          borderRadius: "4px",
          background: "#F7FBFF",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          mt: "15px"
        }}
      >
        <SchemeIcon />
        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "left",
            p: "2px",
            color: "#0D80D8"
          }}
        >
          Выбранная сессия
        </Typography>{" "}
      </Box>

      <Box
        sx={{
          p: "4px",
          border: "1px solid #0D80D8",
          borderRadius: "4px",
          background: "#F7FBFF",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          mt: "15px"
        }}
      >
        <SchemeIcon />
        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "left",
            p: "2px",
            color: "#318CE7",
            fontWeight: "bold"
          }}
        >
          Устройство
        </Typography>{" "}
      </Box>
      <Box></Box>
    </Box>
  );
};
