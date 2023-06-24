import { Router } from "express";
import movieController from "../controllers/movie";

const router = Router();

// Route to get the movies
router.get("/list", movieController.getMoviesList);

// Route to get a movie by id
router.get("/find/:id", movieController.getMovieById);

export default router;
