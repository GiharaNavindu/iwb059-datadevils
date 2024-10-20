// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('voter'); // Default role is 'voter'
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     // Basic validation for password match
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     // Implement actual signup logic (API call to create the account with role)
//     alert(`Account created successfully as ${role}`);

//     // Redirect to the sign-in page after signup
//     navigate('/sign-in'); // Redirect to sign-in page
//   };

//   return (
//     <div className="flex h-screen bg-purple-50">
//       {/* Left side - Sign Up Form */}
//       <div className="flex-1 flex justify-center items-center bg-purple-50">
//         <div className="bg-white shadow-lg rounded-lg border-2 border-purple-500 p-12 w-[500px] transform transition-all duration-300 hover:scale-105">
//           <Typography
//             variant="h4"
//             className="mb-6 text-center text-purple-600 font-extrabold"
//             style={{ fontSize: '2rem' }}  // Increased font size for the title
//           >
//             Sign Up
//           </Typography>
//           <form onSubmit={handleSignUp}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   fontSize: '1.1rem',  // Increased font size of the input text
//                   '& fieldset': {
//                     borderColor: '#1a202c', // border color
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#B708EDFF', // hover effect color
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#B708EDFF', // focused field color
//                   },
//                 },
//               }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   fontSize: '1.1rem',  // Increased font size of the input text
//                   '& fieldset': {
//                     borderColor: '#1a202c', // border color
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#B708EDFF', // hover effect color
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#B708EDFF', // focused field color
//                   },
//                 },
//               }}
//             />
//             <TextField
//               label="Confirm Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   fontSize: '1.1rem',  // Increased font size of the input text
//                   '& fieldset': {
//                     borderColor: '#1a202c', // border color
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#B708EDFF', // hover effect color
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#B708EDFF', // focused field color
//                   },
//                 },
//               }}
//             />

//             {/* Role Selection */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="role-label">Role</InputLabel>
//               <Select
//                 labelId="role-label"
//                 id="role-select"
//                 value={role}
//                 label="Role"
//                 onChange={(e) => setRole(e.target.value)}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     fontSize: '1.1rem',  // Increased font size of the input text
//                     '& fieldset': {
//                       borderColor: '#1a202c', // border color
//                     },
//                     '&:hover fieldset': {
//                       borderColor: '#BD0AF4FF', // hover effect color
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: '#B708EDFF', // focused field color
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="voter">User</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </Select>
//             </FormControl>

//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
//               fullWidth
//               sx={{
//                 mt: 3,
//                 padding: '12px',  // Increased button padding
//                 fontSize: '1.2rem',  // Increased button text size
//                 backgroundColor: '#B408EDFF',
//                 '&:hover': {
//                   backgroundColor: '#7B1193FF',
//                 },
//                 fontWeight: 'bold',
//               }}
//             >
//               Sign Up
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Right side - Image */}
//       <div className="flex-1 hidden md:block">
//         <img
//           src="/img2.png"
//           alt="Sign Up"
//           className="h-[700px] w-[720px] object-cover"
//         />
//       </div>
//     </div>
//   );
// }
import { Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from '../components/Header'; 

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("voter"); // Default role set to 'voter'
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation for password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare user data
    const userData = {
      username: email, // Email as username
      password: password,
      role: role, // Include role in the user data
    };

    // Implement actual signup logic (API call to create the account)
    try {
      const response = await fetch("http://localhost:9090/election/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Account created successfully");
        // Redirect based on role
        if (role === "admin") {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/user-dashboard"); // Redirect to voter dashboard
        }
      } else {
        alert("Failed to create account");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundImage: `url('/back9.jpg')`, // Path to your background image
          backgroundSize: "cover", // Cover the entire screen
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Prevent repeating the image
        }}
      >
        {/* Left side - Sign Up Form */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%', // Adjust width to occupy half of the screen
        }}>
          <div className="flex flex-col justify-center items-center h-full"> {/* Center vertically */}
            <div className="bg-white shadow-lg rounded-lg border-2 border-purple-500 p-12 w-[400px] transform transition-all duration-300 hover:scale-105">
              <Typography
                variant="h4"
                className="mb-6 text-center text-purple-600 font-extrabold"
                style={{ fontSize: "2rem" }} // Increased font size for the title
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
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.1rem", // Increased font size of the input text
                      "& fieldset": {
                        borderColor: "#1a202c", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B708EDFF", // hover effect color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B708EDFF", // focused field color
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
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.1rem", // Increased font size of the input text
                      "& fieldset": {
                        borderColor: "#1a202c", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B708EDFF", // hover effect color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B708EDFF", // focused field color
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
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.1rem", // Increased font size of the input text
                      "& fieldset": {
                        borderColor: "#1a202c", // border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B708EDFF", // hover effect color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B708EDFF", // focused field color
                      },
                    },
                  }}
                />

                {/* Role Selection */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.1rem", // Increased font size of the input text
                        "& fieldset": {
                          borderColor: "#1a202c", // border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#B708EDFF", // hover effect color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#B708EDFF", // focused field color
                        },
                      },
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="voter">Voter</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    padding: "12px", // Increased button padding
                    fontSize: "1.2rem", // Increased button text size
                    backgroundColor: "#B408EDFF",
                    "&:hover": {
                      backgroundColor: "#7B1193FF",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
