const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Gagal! Email telah digunakan" })
            return;
        }

        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Gagal! Role ${req.body.roles[i]} tidak tersedia`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
}

module.exports = verifySignUp;