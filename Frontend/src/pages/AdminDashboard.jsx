import  { useState } from 'react';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");

  const addCandidate = () => {
    setCandidates([...candidates, { name: newCandidate, votes: 0 }]);
    setNewCandidate("");
  };

  return (
    
    <div className="min-h-screen bg-purple-50 p-0"> {/* Light purple background */}
    <Header />
    
      <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">Admin Dashboard</h1>

      <div className="mb-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Add New Candidate</h2>
        <div className="flex gap-4">
          <input
            className="p-3 border border-purple-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            placeholder="Enter candidate name"
          />
          <button
            onClick={addCandidate}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Current Candidates</h2>
        <table className="min-w-full table-auto border-collapse border border-purple-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 border border-purple-300 text-center font-medium">Index</th>
              <th className="px-4 py-3 border border-purple-300 text-center font-medium">Candidate Name</th>
              <th className="px-4 py-3 border border-purple-300 text-center font-medium">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="bg-purple-50 hover:bg-purple-100 transition">
                <td className="px-4 py-3 border border-purple-300 text-center">{index + 1}</td>
                <td className="px-4 py-3 border border-purple-300 text-center">{candidate.name}</td>
                <td className="px-4 py-3 border border-purple-300 text-center">{candidate.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
