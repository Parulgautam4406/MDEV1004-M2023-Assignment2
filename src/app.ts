import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import routes from "./routes/router";
import config from "./configurations/configurations";
import logger from "./logger";

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

// Routes
app.use("/api/", routes);

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error("Error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
