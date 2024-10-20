public type User record {|

    string username;
    string password;
    string role;
|};

public type Vote record {|
    readonly string id;
    string userId;
    string candidateId;
    string electionId;
    string vote;

|};

public type Candidate record {|

    string name;

|};

public type Election record {|

    string name;
    string date;
|};

public type ElectionCandidate record {|
    string electionName;
    string candidateName;
|};

public type ElectionVoter record {|

    string electionName;
    string voter;

|};

public type ElectionResult record {|
    readonly string id;
    string electionId;
    string candidateId;
    string voteCount;
|};

