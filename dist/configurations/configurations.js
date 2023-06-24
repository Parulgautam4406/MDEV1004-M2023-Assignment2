"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongoURI: process.env.MONGODB_URI ||
        "mongodb+srv://200538922:rJj6x7qBHgvzSP9s@cluster0.op2dsua.mongodb.net/movies",
    port: process.env.PORT || "3000",
};
exports.default = config;
