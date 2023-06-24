import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import logger from "../logger";
import passport from "passport";

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

    /**
     * Login User
     *
     * @param req The request object.
     * @param res The response object.
     */
    processLogin(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate("local", (err: any, user: any, info: any) => {
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
    processLogout(req: Request, res: Response): void {
        // Using logout function provided by passport js to logout
        req.logout(() => {
            // When logout is successful
            console.log("User Logged Out");
            // return response
            res.json({ success: true, msg: "User Logged out Successfully!" });
        });
    }
}

export default new Controller();
