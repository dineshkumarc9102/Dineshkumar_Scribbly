import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); //newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not Found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNotesById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content })
        await newNote.save()
        res.status(201).json({ message: "Note Created Successfully!" })
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!updateNote) return res.status(404).json({ message: "Note not Found" });

        res.status(200).json({ message: "Note Updated Successfully!" });

    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if (!deleteNote) return res.status(404).json({ message: "Note not Found" });

        res.status(200).json({ message: "Note Deleted Successfully!" })

    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }

}; 