"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const configurations_1 = __importDefault(require("./configurations/configurations"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
const PORT = configurations_1.default.port;
// MongoDB connection
mongoose_1.default
    .connect(configurations_1.default.mongoURI)
    .then(() => {
    logger_1.default.info("Connected to MongoDB");
    app.listen(PORT, () => {
        logger_1.default.info(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    logger_1.default.error("Error connecting to MongoDB:", error);
});
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/", router_1.default);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    logger_1.default.error("Error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
