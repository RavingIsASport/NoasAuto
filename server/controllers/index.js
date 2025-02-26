import { Router } from "express";
import signAPI from "./signAPI.js";
import carsAPI from "./carsAPI.js";

const router = Router();

router.use("/signin", signAPI);
router.use("/cars", carsAPI);

export default router;
