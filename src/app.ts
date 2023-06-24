import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import routes from "./routes/router";
import config from "./configurations/configurations";
import logger from "./logger";
import cookieParser from "cookie-parser";

// modules for authentication
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

// authentication objects
let strategy = passportLocal.Strategy; // alias
import User from "./models/user";

const app = express();
const PORT = config.port;

// MongoDB connection
mongoose
    .connect(config.mongoURI)
    .then(() => {
        logger.info("Connected to MongoDB");
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB:", error);
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup express session
app.use(
    session({
        secret: config.secret,
        saveUninitialized: false,
        resave: false,
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy
passport.use(User.createStrategy());
// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/api/", routes);

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error("Error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
