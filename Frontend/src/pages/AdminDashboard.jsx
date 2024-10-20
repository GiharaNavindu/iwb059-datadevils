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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  const [step, setStep] = useState("create");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9090/election/events");
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
    console.log("Saving election with data:", currentElection);
    try {
      const response = await axios.post(
        "http://localhost:9090/election/events",
        currentElection
      );
      console.log("Response from server:", response.data);
      setCurrentElection({ name: "", candidates: [], date: null });
      setStep("create");
      fetchEvents();
    } catch (error) {
      console.error("Error saving election:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Server response data:", error.response.data);
      }
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
    return dayjs(date).isBefore(dayjs());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Create New Election</h2>
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
              />
              <DatePicker
                label="Election Date"
                value={currentElection.date}
                onChange={(newValue) =>
                  setCurrentElection({ ...currentElection, date: newValue })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateElection}
              >
                Create Election
              </Button>
            </div>
          )}

          {step === "add" && (
            <div className="space-y-4">
              <h3 className="text-xl">
                Adding Candidates to: {currentElection.name}
              </h3>
              <TextField
                fullWidth
                label="Candidate Name"
                variant="outlined"
                value={newCandidate}
                onChange={(e) => setNewCandidate(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
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
                color="secondary"
                onClick={() => setStep("save")}
              >
                Finish Adding Candidates
              </Button>
            </div>
          )}

          {step === "save" && (
            <div className="space-y-4">
              <h3 className="text-xl">Review and Save Election</h3>
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
                color="primary"
                onClick={handleSaveElection}
              >
                Save Election
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-semibold mb-4">Election Events</h2>
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
                    <TableCell>
                      {dayjs(event.date).format("MM/DD/YYYY")}
                    </TableCell>
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
            <Button onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default AdminDashboard;
