import ballerina/sql;
import ballerinax/mysql;

// Configurable MySQL database parameters
configurable string host = ?;
configurable int port = ?;
// Ensure 'port' is an integer
configurable string user = ?; // User should remain a string
configurable string database = ?; // Database should remain a string
configurable string password = ?; // Password should remain a string
configurable mysql:Options & readonly connectionOptions = {};

// Database client initialization
final mysql:Client dbClient = check new (
    host = host,
    port = port,
    database = database,
    user = user,
    password = password,
    options = connectionOptions
);

// Insert a new user into the database
isolated function insertUser(User user) returns sql:ExecutionResult|error {
    sql:ParameterizedQuery query = `
        INSERT INTO Users ( username, password,role) 
        VALUES ( ${user.username}, ${user.password},${user.role})`;
    return dbClient->execute(query);
}

// Retrieve a user by ID
isolated function selectUser(string username) returns User|sql:Error {
    sql:ParameterizedQuery query = `SELECT * FROM Users WHERE username = ${username}`;
    return dbClient->queryRow(query);
}

isolated function selectAllUsers() returns User[]|sql:Error {
    sql:ParameterizedQuery query = `SELECT * FROM Users`;
    stream<User, sql:Error?> userStream = dbClient->query(query);
    return dbClient->queryRow(query);
}

// // Insert a new election
isolated function insertElection(Election election) returns sql:ExecutionResult|error {
    sql:ParameterizedQuery query = `
        INSERT INTO Elections ( name, date) 
        VALUES ( ${election.name}, ${election.date})`;
    return dbClient->execute(query);
}

// // Retrieve an election by ID
// isolated function selectElection(string id) returns Election|sql:Error {
//     sql:ParameterizedQuery query = `SELECT * FROM Elections WHERE id = ${id}`;
//     return dbClient->queryRow(query);
// }

// // Insert a new candidate
// isolated function insertCandidate(Candidate candidate) returns sql:ExecutionResult|error {
//     sql:ParameterizedQuery query = `
//         INSERT INTO Candidates (id, name, party, electionId) 
//         VALUES (${candidate.id}, ${candidate.name}, ${candidate.party}, ${candidate.electionId})`;
//     return dbClient->execute(query);
// }

// // Retrieve a candidate by ID
// isolated function selectCandidate(string id) returns Candidate|sql:Error {
//     sql:ParameterizedQuery query = `SELECT * FROM Candidates WHERE id = ${id}`;
//     return dbClient->queryRow(query);
// }

// // Insert a vote
// isolated function insertVote(Vote vote) returns sql:ExecutionResult|error {
//     sql:ParameterizedQuery query = `
//         INSERT INTO Votes (id, userId, candidateId, electionId, vote) 
//         VALUES (${vote.id}, ${vote.userId}, ${vote.candidateId}, ${vote.electionId}, ${vote.vote})`;
//     return dbClient->execute(query);
// }

// // Retrieve votes for a specific election
// isolated function selectVotesByElection(string electionId) returns Vote[]|sql:Error {
//     sql:ParameterizedQuery query = `SELECT * FROM Votes WHERE electionId = ${electionId}`;
//     stream<Vote, sql:Error?> voteStream = dbClient->query(query);
//     return from Vote vote in voteStream
//         select vote;
// }
