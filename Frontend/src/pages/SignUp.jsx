import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('voter'); // Default role is 'voter'
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation for password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Implement actual signup logic (API call to create the account with role)
    alert(`Account created successfully as ${role}`);
    
    // Redirect to the sign-in page after signup
    navigate('/sign-in'); // Redirect to sign-in page
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side - Sign Up Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="bg-white shadow-lg rounded-lg border-2 border-purple-500 p-12 w-[500px] transform transition-all duration-300 hover:scale-105">
          <Typography 
            variant="h4" 
            className="mb-6 text-center text-purple-600 font-extrabold"
            style={{ fontSize: '2rem' }}  // Increased font size for the title
          >
            Sign Up
          </Typography>
          <form onSubmit={handleSignUp}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.1rem',  // Increased font size of the input text
                  '& fieldset': {
                    borderColor: '#1a202c', // border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#B708EDFF', // hover effect color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B708EDFF', // focused field color
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.1rem',  // Increased font size of the input text
                  '& fieldset': {
                    borderColor: '#1a202c', // border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#B708EDFF', // hover effect color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B708EDFF', // focused field color
                  },
                },
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.1rem',  // Increased font size of the input text
                  '& fieldset': {
                    borderColor: '#1a202c', // border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#B708EDFF', // hover effect color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B708EDFF', // focused field color
                  },
                },
              }}
            />

            {/* Role Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '1.1rem',  // Increased font size of the input text
                    '& fieldset': {
                      borderColor: '#1a202c', // border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#BD0AF4FF', // hover effect color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#B708EDFF', // focused field color
                    },
                  },
                }}
              >
                <MenuItem value="voter">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth 
              sx={{
                mt: 3,
                padding: '12px',  // Increased button padding
                fontSize: '1.2rem',  // Increased button text size
                backgroundColor: '#B408EDFF', 
                '&:hover': {
                  backgroundColor: '#7B1193FF', 
                },
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden md:block">
  <img 
    src="/img.jpg" 
    alt="Login" 
    className="h-[700px] w-[720px] object-cover" 
  />
</div>

    </div>
  );
}
