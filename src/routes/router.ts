import { Router } from "express";
import movieController from "../controllers/movie";
import userController from "../controllers/user";

const router = Router();

// Route to get the movies
router.get("/list", movieController.getMoviesList);

// Route to get a movie by id
router.get("/find/:id", movieController.getMovieById);

// Route to add movies
router.post("/add", movieController.addMovie);

// Route to update movies
router.post("/update/:id", movieController.updateMovie);

// Route to delete movies
router.delete("/delete/:id", movieController.deleteMovie);

// Route to register user
router.post("/register", userController.processRegisterPage);

// Route to login user
router.post("/login", userController.processLogin);

export default router;
