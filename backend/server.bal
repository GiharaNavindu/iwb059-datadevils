import ballerina/http;
import ballerina/log;
import ballerina/sql;

// import ballerinax/mysql;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5174"],
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

    isolated resource function get users() returns User[]|http:InternalServerError {
        User[]|sql:Error userEntries = selectAllUsers();
        if userEntries is User[] {
            return userEntries;
        }
        return <http:InternalServerError>{body: {message: "Error retrieving users"}};
    }
}

// // Election-related operations
// isolated     resource function post elections(Election election) returns http:Ok|http:InternalServerError     {
//         sql:ExecutionResult|error result= insertElection(election);
// if result is         sql:ExecutionResult          {
// return http:OK ;
//         }
//         log        :printError        ("Failed to insert election" , result);
// return http:INTERNAL_SERVER_ERROR ;
//     }

//     isolated resource function get elections/[string id]() returns Election|http:NotFound|http:InternalServerError     {
//         Election|sql:Error electionEntry= selectElection(id);
// if electionEntry is Election {
// return electionEntry;
//     }
// if electionEntry is     sql:NoRowsError           {
//     return <http:NotFound>      {body:  {message:  "Election not found" } } ;
// }
// return <http:InternalServerError>{body: {message: "Error retrieving election"}};
// }

// // Vote-related operations
// isolated     resource function post votes(Vote vote) returns http:Ok|http:InternalServerError     {
//         sql:ExecutionResult|error result= insertVote(vote);
// if result is         sql:ExecutionResult          {
// return http:OK ;
//         }
//         log        :printError        ("Failed to insert vote" , result);
// return http:INTERNAL_SERVER_ERROR ;
//     }

//     isolated resource function get votes/[string electionId]() returns Vote[]|http:NotFound|http:InternalServerError     {
//         Vote[]|sql:Error voteEntries= selectVotesByElection(electionId);
// if voteEntries is Vote        [] {
// return voteEntries;
//     }
// if voteEntries is     sql:NoRowsError           {
//     return <http:NotFound>      {body:  {message:  "No votes found for this election" } } ;
// }
// return <http:InternalServerError>{body: {message: "Error retrieving votes"}};
// }

// // Candidate-related operations
// isolated     resource function post candidates(Candidate candidate) returns http:Ok|http:InternalServerError     {
//         sql:ExecutionResult|error result= insertCandidate(candidate);
// if result is         sql:ExecutionResult          {
// return http:OK ;
//         }
//         log        :printError        ("Failed to insert candidate" , result);
// return http:INTERNAL_SERVER_ERROR ;
//     }

//     isolated resource function get candidates/[string id]() returns Candidate|http:NotFound|http:InternalServerError     {
//         Candidate|sql:Error candidateEntry= selectCandidate(id);
// if candidateEntry is Candidate {
// return candidateEntry;
//     }
// if candidateEntry is     sql:NoRowsError           {
//     return <http:NotFound>      {body:  {message:  "Candidate not found" } } ;
// }
// return <http:InternalServerError>{body: {message: "Error retrieving candidate"}};
// }
// }
