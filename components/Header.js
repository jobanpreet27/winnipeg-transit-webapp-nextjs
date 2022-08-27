import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { title: "Nearby Stops", url: "/" },
  { title: "Saved", url: "/saved" },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <Link href='/'>
          <Typography variant='h5' sx={{ flexGrow: 1 }} component='a'>
            Winnipeg Transit
          </Typography>
        </Link>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map(({ title, url }) => (
              <MenuItem key={title} onClick={handleCloseNavMenu}>
                <Link href={url}>
                  <Typography textAlign='center' component='a'>
                    {title}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map(({ title, url }) => (
            <Link href={url} key={title}>
              <Button
                key={title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component='a'
              >
                {title}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
