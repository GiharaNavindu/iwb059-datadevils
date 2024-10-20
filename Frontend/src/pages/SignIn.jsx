import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Placeholder for actual authentication logic
    const isAuthenticated = email === 'admin@example.com' && password === 'adminpassword'; // Example check
    const isUserAuthenticated = email === 'user@example.com' && password === 'userpassword'; // Example check

    if (isAuthenticated) {
      alert('Admin logged in successfully');
      navigate('/admin-dashboard'); // Redirect to admin dashboard
    } else if (isUserAuthenticated) {
      alert('User logged in successfully');
      navigate('/user-dashboard'); // Redirect to user dashboard
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          height: '100vh',
          backgroundImage: `url('/back9.jpg')`, // Path to your background image
          backgroundSize: 'cover', // Cover the entire screen
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
        }}
      >
        {/* Left side - Sign In Form */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%', // Adjust width to occupy half of the screen
        }}>
          <div className="bg-white shadow-lg rounded-lg border-2 border-purple-500 p-12 w-[400px] transform transition-all duration-300 hover:scale-105">
            <Typography 
              variant="h4" 
              className="mb-6 text-center text-purple-600 font-extrabold"
              style={{ fontSize: '2.5rem' }}  // Increased font size for the title
            >
              Sign In
            </Typography>
            <form onSubmit={handleSignIn}>
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
                      borderColor: '#A808EDFF', // focused field color
                    },
                  },
                }}
              />
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
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
