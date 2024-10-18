import { useState } from 'react';
import Header from '../components/Header';



// UserDashboard Component
const UserDashboard = () => {
  const [candidates, setCandidates] = useState([
    { name: "Mark", votes: 0 },
    { name: "Mike", votes: 0 },
    { name: "Henry", votes: 0 },
    { name: "Rock", votes: 0 },
  ]);

  const [votes, setVotes] = useState([]); // Track user votes
  const maxVotes = 3; // Maximum votes a user can cast
  const [voteIndex, setVoteIndex] = useState(null);

  const handleVote = () => {
    if (voteIndex !== null && votes.length < maxVotes && !votes.includes(voteIndex)) {
      const updatedCandidates = candidates.map((candidate, index) => {
        if (index === voteIndex) {
          return { ...candidate, votes: candidate.votes + 1 };
        }
        return candidate;
      });
      setCandidates(updatedCandidates);
      setVotes([...votes, voteIndex]);
      setVoteIndex(null); // Reset selected candidate
    }
  };

  const leadingCandidate = candidates.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  );

  return (
    <div className="min-h-screen bg-purple-50 p-0">
    <Header />

      <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">User Dashboard</h1>

      <p className="text-lg text-purple-600 text-center">
        You have {maxVotes - votes.length} votes remaining.
      </p>

      <div className="mt-8 max-w-xl mx-auto">
        <label className="block text-purple-600 mb-2 font-medium">Select Candidate to Vote:</label>
        <select
          className="p-3 border border-purple-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={voteIndex || ''}
          onChange={(e) => setVoteIndex(Number(e.target.value))}
          disabled={votes.length >= maxVotes} // Disable select if user has used all votes
        >
          <option value="" disabled>
            Select a candidate
          </option>
          {candidates.map((candidate, index) => (
            <option key={index} value={index} disabled={votes.includes(index)}>
              {candidate.name} {votes.includes(index) && "(Already voted)"}
            </option>
          ))}
        </select>

        <button
          onClick={handleVote}
          className={`mt-4 py-3 px-6 rounded-lg text-white w-full ${
            votes.length >= maxVotes || voteIndex === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 transition"
          }`}
          disabled={votes.length >= maxVotes || voteIndex === null}
        >
          Vote
        </button>
      </div>

      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Candidate List</h2>
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

      <div className="mt-8 bg-purple-100 p-4 rounded-lg max-w-xl mx-auto shadow-lg">
        <h3 className="text-lg font-bold text-purple-700">Leading Candidate:</h3>
        <p className="text-lg text-purple-600">
          {leadingCandidate.name} with {leadingCandidate.votes} votes
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
