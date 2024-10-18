import  { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

export default function Header() {
  // State to track if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // You can also add more logout logic like clearing tokens, etc.
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a202c" }}>
      <Toolbar className="flex justify-between">
        {/* Logo and Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          <img src="/logo.png" alt="logo" style={{ width: "40px", marginRight: "10px" }} />
          DevilVote
        </Typography>

        {/* Conditional Rendering based on Authentication Status */}
        <Box sx={{ ml: "auto" }}>
          <Button color="inherit" href="/">Home</Button>
          
          {isLoggedIn ? (
            <>
              <Button color="inherit" href="/profile">Profile Settings</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/sign-in">SignIn</Button>
              <Button color="inherit" href="/sign-up">SignUp</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
