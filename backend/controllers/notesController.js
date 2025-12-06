import Note from "../models/note.js";

export async function getsAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, contents } = req.body;

    if (!title || !contents) {
      return res.status(400).json({ message: "Title and contents are required" });
    }

    const newNote = new Note({ title, contents });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNotes controller:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export async function updatesNotes(req, res) {
  try {
    const { title, contents } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, contents },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updatesNotes controller:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotes controller:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}