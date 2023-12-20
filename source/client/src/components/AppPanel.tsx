import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CUserData from "./Dialogs/CUserData";
import ChangePass from "./Dialogs/ChangePass";
import { onLogOut } from "../store/authStore/UserStore";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { MenuSvg, UserSvg } from "../assets/icons/icons";
import { render } from "react-dom";


function AppPanel() {
  const { code } = useAppSelector(state => state.userReducer); //// Значения из стора

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(
    null
  );

  // открытие меню пользователя 
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // закрытие меню пользователя 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // открытие меню админа 
  const handleOpenAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };
  // закрытие меню админа 
  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };


  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#F3F6F9",
        boxShadow: "none",
        borderBottom: "1px solid #E5EAF2",
        pr: "12px",
        pl: "12px"
      }}
    >
      {/* Меню администратора */}
      <Toolbar disableGutters>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Tooltip title="Меню администратора">
            <IconButton onClick={handleOpenAdminMenu}>
              <MenuSvg />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-admin-appbar"
            anchorEl={anchorElAdmin}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElAdmin)}
            onClose={handleCloseAdminMenu}
          >

            <MenuItem>Устройства</MenuItem>
            <MenuItem onClick={() => console.log("Пользователи")}>
              Пользователи
            </MenuItem>
            <MenuItem onClick={()=>{console.log("Организации");}}> 
              Организации
            </MenuItem>
            <MenuItem onClick={() => console.log("Должности")}>
              Должности
            </MenuItem>
          </Menu>
        </Box>


        {/* Меню юзера */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Настройки профиля">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <UserSvg />
              <Typography sx={{ ml: "5px", fontSize: "14px" }}>
                {" "}
                Админ Админ Админ
              </Typography>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <CUserData />
            <ChangePass />
            <Divider sx={{ m: "16px" }} />

            <MenuItem
              onClick={() => {
                dispatch(onLogOut(code));
              }}
              sx={{ color: "#266BF1" }}
            >
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "#266BF1" }} />
              </ListItemIcon>{" "}
              Выйти
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppPanel;
