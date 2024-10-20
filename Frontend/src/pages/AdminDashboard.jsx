// import  { useState } from 'react';
// import Header from '../components/Header';

// const AdminDashboard = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [newCandidate, setNewCandidate] = useState("");

//   const addCandidate = () => {
//     setCandidates([...candidates, { name: newCandidate, votes: 0 }]);
//     setNewCandidate("");
//   };

//   return (

//     <div className="min-h-screen bg-purple-50 p-0"> {/* Light purple background */}
//     <Header />

//       <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">Admin Dashboard</h1>

//       <div className="mb-8 max-w-xl mx-auto">
//         <h2 className="text-2xl font-semibold text-purple-600 mb-4">Add New Candidate</h2>
//         <div className="flex gap-4">
//           <input
//             className="p-3 border border-purple-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
//             type="text"
//             value={newCandidate}
//             onChange={(e) => setNewCandidate(e.target.value)}
//             placeholder="Enter candidate name"
//           />
//           <button
//             onClick={addCandidate}
//             className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-2xl font-semibold text-purple-600 mb-4">Current Candidates</h2>
//         <table className="min-w-full table-auto border-collapse border border-purple-300 shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-purple-600 text-white">
//             <tr>
//               <th className="px-4 py-3 border border-purple-300 text-center font-medium">Index</th>
//               <th className="px-4 py-3 border border-purple-300 text-center font-medium">Candidate Name</th>
//               <th className="px-4 py-3 border border-purple-300 text-center font-medium">Votes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((candidate, index) => (
//               <tr key={index} className="bg-purple-50 hover:bg-purple-100 transition">
//                 <td className="px-4 py-3 border border-purple-300 text-center">{index + 1}</td>
//                 <td className="px-4 py-3 border border-purple-300 text-center">{candidate.name}</td>
//                 <td className="px-4 py-3 border border-purple-300 text-center">{candidate.votes}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import AdapterDayjs
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [currentElection, setCurrentElection] = useState({
    name: "",
    candidates: [],
    date: null,
  });
  const [newCandidate, setNewCandidate] = useState("");
  const [step, setStep] = useState("create"); // 'create', 'add', 'save'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateElection = () => {
    if (currentElection.name && currentElection.date) {
      setStep("add");
    }
  };

  const handleAddCandidate = () => {
    if (newCandidate) {
      setCurrentElection((prev) => ({
        ...prev,
        candidates: [...prev.candidates, { name: newCandidate, votes: 0 }],
      }));
      setNewCandidate("");
    }
  };

  const handleSaveElection = async () => {
    try {
      await axios.post("http://localhost:8080/api/events", currentElection);
      setCurrentElection({ name: "", candidates: [], date: null });
      setStep("create");
      fetchEvents();
    } catch (error) {
      console.error("Error saving election:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const isEventPast = (date) => {
    return dayjs(date).isBefore(dayjs()); // Use dayjs for date comparison
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Admin Dashboard</h1>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Create New Election</h2>
          {step === "create" && (
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Election Name"
                variant="outlined"
                value={currentElection.name}
                onChange={(e) =>
                  setCurrentElection({
                    ...currentElection,
                    name: e.target.value,
                  })
                }
                sx={{ "& label.Mui-focused": { color: "purple" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "purple" } }}
              />
              <DatePicker
                label="Election Date"
                value={currentElection.date}
                onChange={(newValue) =>
                  setCurrentElection({ ...currentElection, date: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth sx={{ "& label.Mui-focused": { color: "purple" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "purple" } }} />}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "purple", "&:hover": { backgroundColor: "darkpurple" } }}
                onClick={handleCreateElection}
              >
                Create Election
              </Button>
            </div>
          )}

          {step === "add" && (
            <div className="space-y-4">
              <h3 className="text-xl text-purple-600">Adding Candidates to: {currentElection.name}</h3>
              <TextField
                fullWidth
                label="Candidate Name"
                variant="outlined"
                value={newCandidate}
                onChange={(e) => setNewCandidate(e.target.value)}
                sx={{ "& label.Mui-focused": { color: "purple" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "purple" } }}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "purple", "&:hover": { backgroundColor: "darkpurple" } }}
                onClick={handleAddCandidate}
              >
                Add Candidate
              </Button>
              <ul className="list-disc pl-5">
                {currentElection.candidates.map((candidate, index) => (
                  <li key={index}>{candidate.name}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                sx={{ backgroundColor: "purple", "&:hover": { backgroundColor: "darkpurple" } }}
                onClick={() => setStep("save")}
              >
                Finish Adding Candidates
              </Button>
            </div>
          )}

          {step === "save" && (
            <div className="space-y-4">
              <h3 className="text-xl text-purple-600">Review and Save Election</h3>
              <p>Election Name: {currentElection.name}</p>
              <p>Election Date: {currentElection.date?.format("MM/DD/YYYY")}</p>
              <p>Candidates:</p>
              <ul className="list-disc pl-5">
                {currentElection.candidates.map((candidate, index) => (
                  <li key={index}>{candidate.name}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                sx={{ backgroundColor: "purple", "&:hover": { backgroundColor: "darkpurple" } }}
                onClick={handleSaveElection}
              >
                Save Election
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Election Events</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Election Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleEventClick(event)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{dayjs(event.date).format("MM/DD/YYYY")}</TableCell>
                    <TableCell>
                      {isEventPast(event.date) ? "Completed" : "Upcoming"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Dialog open={openDialog} onClose={closeDialog}>
          <DialogTitle>{selectedEvent?.name}</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <div>
                <p>Date: {dayjs(selectedEvent.date).format("MM/DD/YYYY")}</p>
                {isEventPast(selectedEvent.date) ? (
                  <div>
                    <h4 className="font-semibold mt-2">Results:</h4>
                    <ul>
                      {selectedEvent.candidates.map((candidate, index) => (
                        <li key={index}>
                          {candidate.name}: {candidate.votes} votes
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold mt-2">Candidates:</h4>
                    <ul>
                      {selectedEvent.candidates.map((candidate, index) => (
                        <li key={index}>{candidate.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "purple" }} onClick={closeDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default AdminDashboard;
