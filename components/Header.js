import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h5' align='center'>
          Winnipeg Transit
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
