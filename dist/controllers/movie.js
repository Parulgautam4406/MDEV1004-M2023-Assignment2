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
                const moviesList = yield model_1.default.find().limit(20).lean();
                console.log("moviesList: ", moviesList[0]);
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
}
exports.default = new Controller();
