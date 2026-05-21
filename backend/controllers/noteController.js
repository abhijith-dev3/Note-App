const Note = require("../models/Note");

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({
            userId: req.user.id,
            title,
            content
        });

        res.status(201).json({
            message: "Note created",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });

        res.status(200).json({
            message: "Notes fetched",
            notes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note found",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        await note.save();

        res.status(200).json({
            message: "Note updated",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note deleted"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createNote,getNotes,getNoteById,updateNote,deleteNote};