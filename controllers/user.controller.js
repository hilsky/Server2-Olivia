exports.allAccess = (req, res) => {
    res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content");
};

exports.pemanduBoard = (req, res) => {
    res.status(200).send("Pemandu board");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin board");
};