import exprepss from "express";
import {
  deleteuser,
  getAlluser,
  getSingleUser,
  updateuser,
} from "../controller/UserController.js";

import { verifyUser } from "../utils/VerifyToken.js";
const router = exprepss.Router();

router.put("/login/:id",   verifyUser, updateuser);
router.delete("/login/:id", verifyUser, deleteuser);
router.get("/login/:id", verifyUser, getSingleUser);
router.get("/login/", verifyUser, getAlluser);

export default router;
