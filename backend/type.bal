public type User record {|
    string username;
    string password;
    string role;
|};

public type Candidate record {|
    string name;
    int votes;
|};

public type Election record {|
    string id;
    string name;
    string date;
    Candidate[] candidates;
|};

public type NewElection record {|
    string name;
    string date;
    Candidate[] candidates;
|};

public type Vote record {|
    string userId;
    string candidateId;
    string electionId;
|};
