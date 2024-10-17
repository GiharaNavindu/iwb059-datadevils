import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a202c" }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="logo" style={{ width: '40px', marginRight: '10px' }} />
          DevilVote
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/sign-in">SignIn</Button>
          <Button color="inherit" href="/sign-up">SignUp</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

