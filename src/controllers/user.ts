import { Request, Response } from "express";
import User from "../models/user";
import logger from "../logger";
import passport from "passport";

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
    processRegisterPage(req: Request, res: Response): void {
        // instantiate a new user object
        let newUser = new User({
            username: req.body.username,
            emailAddress: req.body.EmailAddress,
            displayName: req.body.FirstName + " " + req.body.LastName,
        });

        // Using Passport local mongoose to register the user
        User.register(newUser, req.body.password, (err) => {
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
            return passport.authenticate("local")(req, res, () => {
                return res.json({
                    success: true,
                    msg: "User Logged in Successfully!",
                    user: newUser,
                });
            });
        });
    }
}

export default new Controller();
