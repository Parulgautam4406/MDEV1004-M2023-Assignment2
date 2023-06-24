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
     * Get the movie by id.
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

    /**
     * Add movie too Database.
     *
     * @param req The request object.
     * @param res The response object.
     */
    public async addMovie(req: Request, res: Response): Promise<void> {
        try {
            // Creating movie object
            const movie = new Movie({
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
            const createdMovie = await Movie.create(movie);
            if (!createdMovie) {
                // No movie created
                logger.info("Error in creating movie");
                res.status(404).json({ error: "Error in creating movie" });
            } else {
                logger.info("Found movie");
                res.json(createdMovie);
            }
        } catch (error) {
            logger.error("Error", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new Controller();
