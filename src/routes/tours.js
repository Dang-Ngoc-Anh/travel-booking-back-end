import exprepss from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourtCount,
  updateTour,
} from "../controller/TourController.js";
const router = exprepss.Router();

import { verifyAdmin } from "../utils/VerifyToken.js";
router.post("/", verifyAdmin ,createTour);
router.put("/:id", verifyAdmin , updateTour);
router.delete("/:id", verifyAdmin , deleteTour);
router.get("/:id", verifyAdmin , getSingleTour);
router.get("/", verifyAdmin , getAllTour);
router.get("/search/getTourBySearch", verifyAdmin , getTourBySearch);
router.get("/search/getFeaturedTourBySearch", verifyAdmin , getFeaturedTour);
router.get("/search/getTourCount", verifyAdmin , getFeaturedTour);

export default router;
