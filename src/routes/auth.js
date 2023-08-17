import exprepss from "express";
import {
  getSingleUser,
  login,
  register,
} from "../controller/AuthController.js";
const router = exprepss.Router();
import { verifyUser } from "../utils/VerifyToken.js";
router.post("/register", register);
router.post("/login", login);
router.get("/login/:id", verifyUser, getSingleUser);

export default router;
