"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../models/model"));
const logger_1 = __importDefault(require("../logger"));
/**
 * Controller class for movie-related operations.
 */
class Controller {
    /**
     * Get the top movies.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getMoviesList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moviesList = yield model_1.default.find();
                if (moviesList.length === 0) {
                    // No movies found
                    logger_1.default.info("No movies found");
                    res.status(404).json({ error: "No movies found" });
                }
                else {
                    logger_1.default.info("Found movies");
                    res.json(moviesList);
                }
            }
            catch (error) {
                logger_1.default.error("Error", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    /**
     * Get the movie by id.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getMovieById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const movie = yield model_1.default.find({ _id: id });
                if (!movie) {
                    // No movies found
                    logger_1.default.info("No movie found");
                    res.status(404).json({ error: "No movie found" });
                }
                else {
                    logger_1.default.info("Found movie");
                    res.json(movie);
                }
            }
            catch (error) {
                logger_1.default.error("Error", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    /**
     * Add movie too Database.
     *
     * @param req The request object.
     * @param res The response object.
     */
    addMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Creating movie object
                const movie = new model_1.default({
                    Title: req.body.Title,
                    Year: req.body.Year,
                    Rated: req.body.Rated,
                    Released: req.body.Released,
                    Runtime: req.body.Runtime,
                    Genre: req.body.Genre,
                    Director: req.body.Director,
                    Writer: req.body.Writer,
                    Actors: req.body.Actors,
                    Plot: req.body.Plot,
                    Language: req.body.Language,
                    Country: req.body.Country,
                    Awards: req.body.Awards,
                    Poster: req.body.Poster,
                    Ratings: JSON.parse(req.body.Ratings),
                    Metascore: req.body.Metascore,
                    imdbRating: req.body.imdbRating,
                    imdbVotes: req.body.imdbVotes,
                    imdbID: req.body.imdbID,
                    Type: req.body.Type,
                    DVD: req.body.DVD,
                    BoxOffice: req.body.BoxOffice,
                    Production: req.body.Production,
                    Website: req.body.Website,
                    Response: req.body.Response,
                });
                // Creating in database
                const createdMovie = yield model_1.default.create(movie);
                if (!createdMovie) {
                    // No movie created
                    logger_1.default.info("Error in creating movie");
                    res.status(404).json({ error: "Error in creating movie" });
                }
                else {
                    logger_1.default.info("Found movie");
                    res.json(createdMovie);
                }
            }
            catch (error) {
                logger_1.default.error("Error", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.default = new Controller();
