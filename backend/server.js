import express from "express";
import notesRoutes from "./routes/NoteRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "./middleware/ratelimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(rateLimit)
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});