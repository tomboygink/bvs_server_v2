import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { changeTopMenu } from "../../store/authStore/DevsGrStore";

export const TopPanel = () => {
  const dispatch = useAppDispatch();

  const [alignment, setAlignment] = React.useState("top_menu-1");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    dispatch(changeTopMenu(newAlignment));
  };

  console.log(alignment, "alignment");
  return (
    <Box
      className="top_panel_div"
      sx={{ background: "#fff", width: "100%", textAlign: "left" }}
    >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton
          sx={{
            border: "none",
            p: "4px",
            mr: "24px",
            textTransform: "none",
            fontSize: "12px",
            borderRadius: "4px"
          }}
          value="top_menu-1"
        >
          Устройство
        </ToggleButton>
        <ToggleButton
          sx={{
            border: "none",
            p: "4px",
            mr: "24px",
            textTransform: "none",
            fontSize: "12px",
            borderRadius: "4px"
          }}
          value="top_menu-2"
        >
          Сессии за период
        </ToggleButton>
        <ToggleButton
          sx={{
            border: "none",
            p: "4px",
            mr: "24px",
            textTransform: "none",
            fontSize: "12px",
            borderRadius: "4px"
          }}
          value="top_menu-3"
        >
          Контроль критичности отклюнений
        </ToggleButton>
        <ToggleButton
          sx={{
            border: "none",
            p: "4px",
            mr: "24px",
            textTransform: "none",
            fontSize: "12px",
            borderRadius: "4px"
          }}
          value="top_menu-4"
        >
          Выбранная сессия
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
