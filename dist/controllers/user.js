"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
/**
 * Controller class for user-related / authentication operations.
 */
class Controller {
    /**
     * Register User
     *
     * @param req The request object.
     * @param res The response object.
     */
    processRegisterPage(req, res) {
        // instantiate a new user object
        let newUser = new user_1.default({
            username: req.body.username,
            emailAddress: req.body.EmailAddress,
            displayName: req.body.FirstName + " " + req.body.LastName,
        });
        // Using Passport local mongoose to register the user
        user_1.default.register(newUser, req.body.password, (err) => {
            if (err) {
                console.error("Error: Inserting New User");
                if (err.name == "UserExistsError") {
                    console.error("Error: User Already Exists");
                }
                return res.json({
                    success: false,
                    msg: "User not Registered Successfully!",
                });
            }
            // automatically login the user
            return passport_1.default.authenticate("local")(req, res, () => {
                return res.json({
                    success: true,
                    msg: "User Logged in Successfully!",
                    user: newUser,
                });
            });
        });
    }
    /**
     * Login User
     *
     * @param req The request object.
     * @param res The response object.
     */
    processLogin(req, res, next) {
        passport_1.default.authenticate("local", (err, user, info) => {
            // are there server errors?
            if (err) {
                console.error(err);
                return next(err);
            }
            // are the login errors?
            if (!user) {
                return res.json({
                    success: false,
                    msg: "User Not Logged in Successfully!",
                    user: user,
                });
            }
            req.login(user, (err) => {
                // are there DB errors?
                if (err) {
                    console.error(err);
                    return next(err);
                }
                // return response
                return res.json({
                    success: true,
                    msg: "User Logged in Successfully!",
                    user: user,
                });
            });
        })(req, res, next);
    }
    /**
     * Login User
     *
     * @param req The request object.
     * @param res The response object.
     */
    processLogout(req, res) {
        // Using logout function provided by passport js to logout
        req.logout(() => {
            // When logout is successful
            console.log("User Logged Out");
            // return response
            res.json({ success: true, msg: "User Logged out Successfully!" });
        });
    }
}
exports.default = new Controller();
