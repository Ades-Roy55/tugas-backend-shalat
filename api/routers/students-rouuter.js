import express from "express";
import {
  studentsBaru,
  getAllStd,
  getStdById,
  updateStudents,
  deleteStudentById,
} from "../control/students.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/api/v1/studentsBaru", verifyToken, studentsBaru);
router.get("/api/v1/getAllStd", verifyToken, getAllStd);
router.get("/api/v1/getStdById/:id", verifyToken, getStdById);
router.put("/api/v1/updateStudents/:id", verifyToken, updateStudents);
router.delete("/api/v1/deleteStudentById/:id", verifyToken, deleteStudentById);

export default router;
