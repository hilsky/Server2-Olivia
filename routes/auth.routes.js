const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.get("/api/auth/getUser", controller.getDataUser)

    app.get("api/auth/getUser/:id", controller.getDataUserById)

    app.put("api/auth/updateUser/:id", controller.updateUser);

    app.delete("api/auth/deletUser/:id", controller.deleteById);
};