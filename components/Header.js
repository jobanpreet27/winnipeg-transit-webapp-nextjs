import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>
          Winnipeg Transit
        </Typography>
        <Box sx={{ display: { sm: "block" } }}>
          <Link href='/'>
            <Button sx={{ color: "#fff" }}>Home</Button>
          </Link>
          <Link href='/saved'>
            <Button sx={{ color: "#fff" }}>Saved</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
