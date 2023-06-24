"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
/**
 * Controller class for user-related operations.
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
}
exports.default = new Controller();
