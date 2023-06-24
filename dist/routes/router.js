"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = __importDefault(require("../controllers/movie"));
const router = (0, express_1.Router)();
// Route to get the movies
router.get("/list", movie_1.default.getMoviesList);
// Route to get a movie by id
router.get("/find/:id", movie_1.default.getMovieById);
// Route to add movies
router.post("/add", movie_1.default.addMovie);
// Route to update movies
router.post("/update/:id", movie_1.default.updateMovie);
// Route to delete movies
router.delete("/delete/:id", movie_1.default.deleteMovie);
exports.default = router;
