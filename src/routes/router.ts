import { Router } from "express";
import movieController from "../controllers/movie";

const router = Router();

// Route to get the movies
router.get("/list", movieController.getMoviesList);

export default router;
