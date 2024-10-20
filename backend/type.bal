public type User record {|

    string username;
    string password;
|};

public type Vote record {|
    readonly string id;
    string userId;
    string candidateId;
    string electionId;
    string vote;

|};

public type Candidate record {|
    readonly string id;
    string name;
    string party;
    string electionId;
|};

public type Election record {|
    readonly string id;
    string name;
    string date;
    string description;
    string status;
|};

public type ElectionCandidate record {|
    readonly string id;
    string electionId;
    string candidateId;
|};

public type ElectionVoter record {|
    readonly string id;
    string electionId;
    string voterId;

|};

public type ElectionResult record {|
    readonly string id;
    string electionId;
    string candidateId;
    string voteCount;
|};

