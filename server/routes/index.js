import { Router } from "express";

import movieRouter from "./movie.routes.js";
import authRoutes from "./auth.routes.js";
import ratingsRouter from "./rating.routes.js";

const router = Router();

router.use('/api/movies', movieRouter);

router.use('', authRoutes);

router.use('/api/ratings', ratingsRouter);

export default router;
