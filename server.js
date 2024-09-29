//dependencies
const express = require("express");
const connecToDb = require("./config/connecToDb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  createNote, fetchNote, fetchNotes, updateNote, deleteNote
} = require("./controllers/notesControllers");
const {
  signup, login, logout, checkAuth
} = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

if (process.env.NODE_ENV != "production") require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://notepro-eight.vercel.app",
        "http://localhost:3001",
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true, // Allow credentials (cookies)
  })
);

app.options("*", cors()); // Handle preflight requests

app.use(cookieParser());

// Connect to DB
connecToDb();

// Routes
app.get('/', (req, res) => {
  res.send("Hello world");
});

app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/check-auth", requireAuth, checkAuth);

app.post("/notes", requireAuth, createNote);
app.get("/notes", requireAuth, fetchNotes);
app.get("/notes/:id", requireAuth, fetchNote);
app.put("/notes/:id", requireAuth, updateNote);
app.delete("/notes/:id", requireAuth, deleteNote);

// Start our server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
