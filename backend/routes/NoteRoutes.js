import express from "express";
import {
  getNoteById,
  getsAllNotes,
  createNotes,
  updatesNotes,
  deleteNotes,
} from "../controllers/notesController.js";
import { rateLimit } from "../middleware/ratelimiter.js";

const router = express.Router();

router.get("/", rateLimit, getsAllNotes);
router.get("/:id", rateLimit, getNoteById);
router.post("/", rateLimit, createNotes);
router.put("/:id", rateLimit, updatesNotes);
router.delete("/:id", rateLimit, deleteNotes);

export default router;
