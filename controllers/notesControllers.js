const Note = require("../models/note");

const createNote = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const note = await Note.create({
    title: title,
    body: body,
    user: req.user._id,
  });

  res.json({ note: note });
};
const fetchNotes = async (req, res) => {
  console.log(req.user._id);
  const notes = await Note.find({ user: req.user._id });

  console.log(notes);
  res.json({ notes: notes });
};
const fetchNote = async (req, res) => {
  const id = req.params.id;

  const note = await Note.findOne({
    _id: id,
    user: req.user._id,
  });
  res.json({ note: note });
};
const updateNote = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;

  try {
    await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        title: title,
        body: body,
      }
    );
    const note = await Note.findById(id);
  
    res.json({ note: note });
  } catch (error) {
    console.log(error.message)
  }

};
const deleteNote = async (req, res) => {
  const id = req.params.id;
  await Note.deleteOne({ _id: id, user: req.user._id });

  res.json({ message: "deleted" });
};

module.exports = { createNote, fetchNote, fetchNotes, updateNote, deleteNote };
