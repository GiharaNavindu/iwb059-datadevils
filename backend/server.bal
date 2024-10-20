import ballerina/http;
import ballerina/log;
import ballerina/sql;

// Ensure this import is correct and points to the module where Candidate is defined

// import ballerinax/mysql;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}
service /election on new http:Listener(9090) {

    // User-related operations
    isolated resource function post users(User user) returns http:Ok|http:InternalServerError {
        sql:ExecutionResult|error result = insertUser(user);
        if result is sql:ExecutionResult {
            return http:OK;
        }
        log:printError("Failed to insert user", result);
        return http:INTERNAL_SERVER_ERROR;
    }

    isolated resource function get users/[string username]() returns User|http:NotFound|http:InternalServerError {
        User|sql:Error userEntry = selectUser(username);
        if userEntry is User {
            return userEntry;
        }
        if userEntry is sql:NoRowsError {
            return <http:NotFound>{body: {message: "User not found"}};
        }
        return <http:InternalServerError>{body: {message: "Error retrieving user"}};
    }

    // Create a new election
    resource function post events(NewElection election) returns http:Created|http:InternalServerError {
        string|error result = insertElection(election);
        if result is string {
            return http:CREATED;
        }
        return http:INTERNAL_SERVER_ERROR;
    }

    // Get all events
    resource function get events() returns Election[]|http:InternalServerError {
        Election[]|error events = getEvents();
        if events is Election[] {
            return events;
        }
        return http:INTERNAL_SERVER_ERROR;
    }

    // Vote in an election
    resource function put events/[string electionId]/vote(Vote vote) returns http:Ok|http:BadRequest|http:InternalServerError {
        Election[]|error events = getEvents();
        if events is error {
            return http:INTERNAL_SERVER_ERROR;
        }

        Election? targetEvent = ();
        foreach var e in events {
            if e.id == electionId {
                targetEvent = e;
                break;
            }
        }
        if targetEvent is () {
            return <http:BadRequest>{body: {message: "Election not found"}};
        }

        error? result = updateVotes(electionId, vote.candidateId);
        if result is error {
            return http:INTERNAL_SERVER_ERROR;
        }

        return http:OK;
    }
}
