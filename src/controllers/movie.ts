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
            const moviesList = await Movie.find();
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

    /**
     * Get the top movies.
     *
     * @param req The request object.
     * @param res The response object.
     */
    public async getMovieById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const movie = await Movie.find({ _id: id });
            if (!movie) {
                // No movies found
                logger.info("No movie found");
                res.status(404).json({ error: "No movie found" });
            } else {
                logger.info("Found movie");
                res.json(movie);
            }
        } catch (error) {
            logger.error("Error", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new Controller();
