//dependencies
const express = require("express");
const connecToDb = require("./config/connecToDb");
const Note = require("./models/note");
const {
  createNote,
  fetchNote,
  fetchNotes,
  updateNote,
  deleteNote,
} = require("./controllers/notesControllers");
const cors = require("cors");
const {
  signup,
  login,
  logout,
  checkAuth,
} = require("./controllers/usersController");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");

if (process.env.NODE_ENV != "production") require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://notepro-eight.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

connecToDb();

//routes
app.get('/' , (req,res)=>{
  res.send("Hello world")
})

app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/check-auth", requireAuth, checkAuth);

app.post("/notes",requireAuth, createNote);
app.get("/notes", requireAuth,fetchNotes);
app.get("/notes/:id", requireAuth,fetchNote);
app.put("/notes/:id",requireAuth, updateNote);
app.delete("/notes/:id", requireAuth,deleteNote);

//Start our server
app.listen(process.env.PORT);
