import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import useUserData from "../hooks/use-user-data";
import { auth } from "../lib/firebase";
import { Avatar, CardHeader } from "@mui/material";

const UserMenu = () => {
  const { user } = useUserData();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogout = React.useCallback(() => {
    setAnchorElUser(null);
    auth.signOut();
  }, [setAnchorElUser]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <Button
          variant="text"
          sx={{ color: "white" }}
          onClick={handleOpenUserMenu}
        >
          <CardHeader
            sx={{ p: 0 }}
            avatar={
              <Avatar
                imgProps={{ referrerPolicy: "no-referrer" }}
                src={user?.photoUrl || undefined}
              />
            }
            title={user?.username}
          />
        </Button>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link href="/profile">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClickLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default UserMenu;
