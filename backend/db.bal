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
        INSERT INTO Users (username, password, role) 
        VALUES (${user.username}, ${user.password}, ${user.role})`;
    return dbClient->execute(query);
}

// Retrieve a user by ID
isolated function selectUser(string username) returns User|sql:Error {
    sql:ParameterizedQuery query = `SELECT * FROM Users WHERE username = ${username}`;
    return dbClient->queryRow(query);
}

// Retrieve all users

isolated function insertElection(NewElection election) returns string|error {
    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO Elections (name, date)
        VALUES (${election.name}, ${election.date})
    `);

    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is string {
        string electionId = lastInsertId;

        foreach var candidate in election.candidates {
            _ = check dbClient->execute(`
                INSERT INTO Candidates (name, electionId, votes)
                VALUES (${candidate.name}, ${electionId}, 0)
            `);
        }

        return electionId;
    } else {
        return error("Failed to get last insert ID");
    }
}

isolated function getEvents() returns Election[]|error {
    stream<record {|string id; string name; string date;|}, sql:Error?> electionStream = dbClient->query(`
        SELECT id, name, date FROM Elections
    `);

    Election[] events = [];
    check from record {|string id; string name; string date;|} electionRecord in electionStream
        do {
            Candidate[] candidates = check getCandidates(electionRecord.id);
            events.push({
                id: electionRecord.id,
                name: electionRecord.name,
                date: electionRecord.date,
                candidates: candidates
            });
        };

    check electionStream.close();
    return events;
}

isolated function getCandidates(string electionId) returns Candidate[]|error {
    stream<record {|string name; int votes;|}, sql:Error?> candidateStream = dbClient->query(`
        SELECT name, votes FROM Candidates WHERE electionId = ${electionId}
    `);

    Candidate[] candidates = [];
    check from record {|string name; int votes;|} candidateRecord in candidateStream
        do {
            candidates.push({
                name: candidateRecord.name,
                votes: candidateRecord.votes
            });
        };

    check candidateStream.close();
    return candidates;
}

isolated function updateVotes(string electionId, string candidateId) returns error? {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE Candidates
        SET votes = votes + 1
        WHERE electionId = ${electionId} AND id = ${candidateId}
    `);

    if result.affectedRowCount == 0 {
        return error("No candidate found with the given ID in the specified election");
    }
}

