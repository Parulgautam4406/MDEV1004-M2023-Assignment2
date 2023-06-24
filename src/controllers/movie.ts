import { Request, Response } from "express";
import Movie from "../models/model";
import logger from "../logger";

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
    public async getMoviesList(req: Request, res: Response): Promise<void> {
        try {
            const moviesList = await Movie.find().limit(20).lean();
            console.log("moviesList: ", moviesList[0]);
            if (moviesList.length === 0) {
                // No movies found
                logger.info("No movies found");
                res.status(404).json({ error: "No movies found" });
            } else {
                logger.info("Found movies");
                res.json(moviesList);
            }
        } catch (error) {
            logger.error("Error", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new Controller();
