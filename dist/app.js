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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// modules for authentication
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
// authentication objects
let strategy = passport_local_1.default.Strategy; // alias
const user_1 = __importDefault(require("./models/user"));
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
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// setup express session
app.use((0, express_session_1.default)({
    secret: configurations_1.default.secret,
    saveUninitialized: false,
    resave: false,
}));
// initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// implement an Auth Strategy
passport_1.default.use(user_1.default.createStrategy());
// serialize and deserialize user data
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
// Routes
app.use("/api/", router_1.default);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    logger_1.default.error("Error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
